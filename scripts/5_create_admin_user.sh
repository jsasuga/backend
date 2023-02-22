
echo "-----CREATE ADMIN USER-----"
# register admin user
curl --request POST \
  --header 'Content-Type: application/json' \
  --data  '{ "email": "admin@admin.com", "password": "password", "name": "Admin", "userCode": "ADMIN_CODE", "roleId": 3, "providerId": 1 }' \
  --url http://localhost:1938/auth/register

echo "----------"
echo "-----TRY TO LOGIN WITH CREDENTIALS-----"
# test login with admin user
curl --request POST \
  --header 'Content-Type: application/json' \
  --data  '{ "email": "admin@admin.com", "password": "password" }' \
  --url http://localhost:1938/auth/login
echo "----------"