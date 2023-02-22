#!/bin/bash

# run migration
cd ~/backend/
yarn migration:run

echo "-----MIGRATIONS FINISHED RUNNING-----"


echo "-----CREATE ADMIN USER-----"
# register admin user
curl --request POST \
  --header 'Content-Type: application/json' \
  --data  '{ "email": "admin@admin.com", "password": "password", "name": "Admin", "userCode": "ADMIN_CODE", "roleId": 3, "providerId": 1 }' \
  --url http://localhost:1938/auth/register

# test login with admin user
curl --request POST \
  --header 'Content-Type: application/json' \
  --data  '{ "email": "admin@admin.com", "password": "password" }' \
  --url http://localhost:1938/auth/login
