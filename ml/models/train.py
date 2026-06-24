"""
PDDS — EfficientNet-B4 Training Script
Fine-tunes EfficientNet-B4 on the PlantVillage dataset (38 disease classes).

Usage:
    python train.py --data_dir ./data/PlantVillage --epochs 30 --batch_size 32

Dataset:
    Download PlantVillage from: https://github.com/spMohanty/PlantVillage-Dataset
    Or via Kaggle: https://www.kaggle.com/datasets/emmarex/plantdisease
"""

import argparse
import os
import json
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader, random_split
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR
import timm
import numpy as np
from datetime import datetime

# ─── Config ───────────────────────────────────────────────
NUM_CLASSES = 38
IMAGE_SIZE = 380          # EfficientNet-B4 optimal input size
EARLY_STOP_PATIENCE = 5


def get_transforms(train: bool):
    if train:
        return transforms.Compose([
            transforms.RandomResizedCrop(IMAGE_SIZE, scale=(0.7, 1.0)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomVerticalFlip(),
            transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.3, hue=0.1),
            transforms.RandomRotation(30),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
    return transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])


def build_model(num_classes: int, pretrained: bool = True):
    model = timm.create_model('efficientnet_b4', pretrained=pretrained, num_classes=num_classes)
    return model


def train(args):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")

    # ─── Dataset ──────────────────────────────────────────
    full_dataset = ImageFolder(args.data_dir, transform=get_transforms(train=True))
    val_size = int(len(full_dataset) * 0.15)
    test_size = int(len(full_dataset) * 0.10)
    train_size = len(full_dataset) - val_size - test_size

    train_set, val_set, test_set = random_split(full_dataset, [train_size, val_size, test_size])
    val_set.dataset.transform = get_transforms(train=False)
    test_set.dataset.transform = get_transforms(train=False)

    train_loader = DataLoader(train_set, batch_size=args.batch_size, shuffle=True, num_workers=4, pin_memory=True)
    val_loader = DataLoader(val_set, batch_size=args.batch_size, shuffle=False, num_workers=4)

    # Save class names
    class_names = full_dataset.classes
    with open(os.path.join(args.output_dir, 'class_names.json'), 'w') as f:
        json.dump(class_names, f, indent=2)
    print(f"Classes ({len(class_names)}): {class_names[:5]}...")

    # ─── Model ────────────────────────────────────────────
    model = build_model(len(class_names)).to(device)
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
    optimizer = AdamW(model.parameters(), lr=args.lr, weight_decay=0.01)
    scheduler = CosineAnnealingLR(optimizer, T_max=args.epochs)

    # ─── Training Loop ────────────────────────────────────
    best_val_acc = 0.0
    patience_counter = 0
    history = []

    for epoch in range(1, args.epochs + 1):
        # Train
        model.train()
        train_loss, train_correct = 0.0, 0
        for imgs, labels in train_loader:
            imgs, labels = imgs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(imgs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            train_loss += loss.item()
            train_correct += (outputs.argmax(1) == labels).sum().item()

        scheduler.step()
        train_acc = train_correct / train_size

        # Validate
        model.eval()
        val_loss, val_correct = 0.0, 0
        with torch.no_grad():
            for imgs, labels in val_loader:
                imgs, labels = imgs.to(device), labels.to(device)
                outputs = model(imgs)
                val_loss += criterion(outputs, labels).item()
                val_correct += (outputs.argmax(1) == labels).sum().item()

        val_acc = val_correct / val_size
        epoch_data = {'epoch': epoch, 'train_acc': round(train_acc, 4), 'val_acc': round(val_acc, 4)}
        history.append(epoch_data)
        print(f"Epoch {epoch:3d}/{args.epochs} | Train: {train_acc:.4f} | Val: {val_acc:.4f}")

        # Save best
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            patience_counter = 0
            path = os.path.join(args.output_dir, 'efficientnet_b4_plant.pt')
            torch.save(model.state_dict(), path)
            print(f"  ✅ Best model saved (val_acc={best_val_acc:.4f})")
        else:
            patience_counter += 1
            if patience_counter >= EARLY_STOP_PATIENCE:
                print(f"Early stopping at epoch {epoch}")
                break

    # Save training history
    with open(os.path.join(args.output_dir, 'training_history.json'), 'w') as f:
        json.dump({'best_val_acc': best_val_acc, 'history': history}, f, indent=2)

    print(f"\n🏁 Training complete. Best val accuracy: {best_val_acc:.4f}")
    print(f"   Model saved to: {args.output_dir}/efficientnet_b4_plant.pt")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--data_dir', type=str, required=True, help='Path to PlantVillage dataset')
    parser.add_argument('--output_dir', type=str, default='./models', help='Where to save model')
    parser.add_argument('--epochs', type=int, default=30)
    parser.add_argument('--batch_size', type=int, default=32)
    parser.add_argument('--lr', type=float, default=1e-4)
    args = parser.parse_args()
    os.makedirs(args.output_dir, exist_ok=True)
    train(args)
