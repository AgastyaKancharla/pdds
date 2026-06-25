"""
EfficientNet-B4 training script for PlantVillage (38 classes).
Usage: python ml/models/train.py --epochs 50 --batch-size 32
"""
import argparse
from pathlib import Path
import torch, torch.nn as nn, torch.optim as optim
import torchvision.transforms as T
import torchvision.datasets as D
import torchvision.models as M
from torch.utils.data import DataLoader
from torch.optim.lr_scheduler import CosineAnnealingLR

DATA = Path("ml/data/processed")
OUT  = Path("ml/models")
OUT.mkdir(exist_ok=True)

def build(n): 
    m = M.efficientnet_b4(weights=M.EfficientNet_B4_Weights.IMAGENET1K_V1)
    for p in m.parameters(): p.requires_grad = False
    m.classifier = nn.Sequential(nn.Dropout(0.4,True), nn.Linear(m.classifier[1].in_features, n))
    return m

def run(args):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    train_ds = D.ImageFolder(DATA/"train", T.Compose([T.RandomResizedCrop(224),T.RandomHorizontalFlip(),T.ColorJitter(0.3,0.3,0.3),T.ToTensor(),T.Normalize([.485,.456,.406],[.229,.224,.225])]))
    val_ds   = D.ImageFolder(DATA/"val",   T.Compose([T.Resize(256),T.CenterCrop(224),T.ToTensor(),T.Normalize([.485,.456,.406],[.229,.224,.225])]))
    tl = DataLoader(train_ds, args.batch_size, True,  num_workers=4, pin_memory=True)
    vl = DataLoader(val_ds,   args.batch_size, False, num_workers=4, pin_memory=True)
    model = build(len(train_ds.classes)).to(device)
    crit  = nn.CrossEntropyLoss(label_smoothing=0.1)
    opt   = optim.AdamW(model.classifier.parameters(), lr=args.lr, weight_decay=1e-4)
    sch   = CosineAnnealingLR(opt, args.epochs)
    best  = 0.0
    for ep in range(args.epochs):
        model.train()
        for x,y in tl:
            x,y = x.to(device),y.to(device)
            opt.zero_grad(); loss=crit(model(x),y); loss.backward(); opt.step()
        model.eval(); correct=total=0
        with torch.no_grad():
            for x,y in vl:
                x,y=x.to(device),y.to(device)
                pred=model(x).argmax(1); correct+=pred.eq(y).sum().item(); total+=y.size(0)
        acc=100.*correct/total; sch.step()
        print(f"Epoch {ep+1:3d} | Val: {acc:.1f}%")
        if acc>best:
            best=acc; torch.save(model.state_dict(), OUT/"efficientnet_b4_plantvillage.pt")
            print(f"  Saved best model ({acc:.1f}%)")
    print(f"Done. Best: {best:.1f}%")

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--epochs",     type=int,   default=50)
    p.add_argument("--batch-size", type=int,   default=32)
    p.add_argument("--lr",         type=float, default=1e-4)
    run(p.parse_args())
