#!/bin/bash

set -e

echo "📂 Masuk ke folder k6/"
cd k6

echo "📊 Mengaktifkan K6 Web Dashboard..."
export K6_WEB_DASHBOARD=true

echo "🚀 Menjalankan load test k6..."
k6 run src/test-endpoints.js

echo "✅ Semua proses selesai."
