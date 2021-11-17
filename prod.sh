#!/usr/bin/env bash

export NODE_ENV=production
yarn build &&
rm -r ./build/dist &&
cp -r ./dist ./build &&
docker-compose down -v && 
docker-compose up -d --build