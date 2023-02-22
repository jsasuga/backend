#!/bin/bash

echo "SWITCHING DEV CONFIG..."
# dev configs
rm -rf ~/backend/src/common/envs/development.env
mv ~/backend/src/common/envs/development.env.example ~/backend/src/common/envs/development.env

echo "SWITCHING PROD CONFIG..."
# prod configs
rm -rf ~/backend/src/common/envs/production.env
mv ~/backend/src/common/envs/production.env.example ~/backend/src/common/envs/production.env

echo "SWITCHING MIGRATION CONFIG..."
# migration configs
rm -rf ~/backend/.env
mv ~/backend/.env.example ~/backend/.env

echo "ENV FILES HAVE BEEN SWITCHED"