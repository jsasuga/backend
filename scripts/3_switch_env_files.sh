#!/bin/bash

# dev configs
rm -rf ~/backend/src/common/envs/development.env
mv ~/backend/src/common/envs/development.env.example ~/backend/src/common/envs/development.env

# prod configs
rm -rf ~/backend/src/common/envs/production.env
mv ~/backend/src/common/envs/production.env.example ~/backend/src/common/envs/production.env

# migration configs
rm -rf ~/backend/.env
mv ~/backend/.env.example ~/backend/.env
