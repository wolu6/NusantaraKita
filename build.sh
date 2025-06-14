#!/bin/bash

set -e

echo "📂 Masuk ke folder api/"
cd api

echo "📦 Membuat virtual environment..."
python3 -m venv venv

echo "✅ Mengaktifkan virtual environment..."
source venv/bin/activate

echo "📥 Menginstall dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🚀 Build selesai. Untuk menjalankan aplikasi:"
echo "cd api && source venv/bin/activate && uvicorn main:app --reload"
