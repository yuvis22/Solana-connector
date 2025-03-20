#!/bin/bash

# Remove dist directory if it exists
rm -rf dist

# Run webpack build
webpack --mode production

# Create icons directory in dist
mkdir -p dist/icons

# Copy public files to dist
cp public/* dist/ 2>/dev/null || :

# Copy icons directory
cp -r public/icons/* dist/icons/ 