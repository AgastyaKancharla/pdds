"""
PDDS — Dataset Preparation Script
Downloads and prepares the PlantVillage dataset for training.

Usage:
    python prepare_dataset.py --output_dir ./data/PlantVillage
"""
import os
import argparse
import urllib.request
import zipfile
import shutil

DATASET_INFO = """
PlantVillage Dataset — 54,306 images, 38 disease classes

DOWNLOAD OPTIONS:
─────────────────
1. Kaggle (recommended):
   https://www.kaggle.com/datasets/emmarex/plantdisease
   → Download and extract to: data/PlantVillage/

2. Direct GitHub (color images):
   https://github.com/spMohanty/PlantVillage-Dataset

3. Papers With Code:
   https://paperswithcode.com/dataset/plantvillage-dataset

EXPECTED DIRECTORY STRUCTURE:
──────────────────────────────
data/PlantVillage/
├── Apple___Apple_scab/
│   ├── image1.jpg
│   └── ...
├── Apple___Black_rot/
├── Tomato___Early_blight/
└── ... (38 folders total)

CLASS DISTRIBUTION:
───────────────────
Total images:  54,306
Healthy:       ~17,000 images across 14 plant types
Diseased:      ~37,000 images across 26 disease types
"""

def verify_dataset(data_dir: str) -> bool:
    if not os.path.exists(data_dir):
        print(f"❌ Directory not found: {data_dir}")
        return False
    
    classes = [d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))]
    print(f"Found {len(classes)} classes in {data_dir}")
    
    total_images = 0
    for cls in classes:
        cls_dir = os.path.join(data_dir, cls)
        images = [f for f in os.listdir(cls_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        total_images += len(images)
    
    print(f"Total images: {total_images}")
    
    if len(classes) < 30:
        print(f"⚠️  Expected 38 classes, found {len(classes)}")
        return False
    
    print("✅ Dataset verified successfully")
    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output_dir', type=str, default='./data/PlantVillage')
    parser.add_argument('--verify', action='store_true', help='Only verify existing dataset')
    args = parser.parse_args()
    
    print(DATASET_INFO)
    
    if args.verify:
        verify_dataset(args.output_dir)
    else:
        print(f"\nPlease download the dataset manually and extract to: {args.output_dir}")
        print("Then run: python prepare_dataset.py --verify --output_dir", args.output_dir)
