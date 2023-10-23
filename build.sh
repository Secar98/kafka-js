#! /bin/bash
cd consumer/ && npm install && npm run build

cd ..

cd producer/ && npm install && npm run build
