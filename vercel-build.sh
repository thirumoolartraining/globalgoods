#!/bin/bash
set -e

# Log environment information
echo "=== Environment Information ==="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la

echo "\n=== Installing Dependencies ==="
npm ci

echo "\n=== Building Application ==="
npm run build

echo "\n=== Build Output ==="
echo "Contents of dist directory:"
ls -la dist || echo "dist directory not found"

echo "\n=== Build Complete ==="
