#!/bin/bash

# install postgres if not installed yet
# sudo apt update
# sudo apt install postgresql postgresql-contrib
# sudo systemctl start postgresql.service

# check postgres status
sudo systemctl status postgresql.service

# create database on postgres and update password
sudo -i -u postgres
psql
ALTER USER postgres PASSWORD 'abnOMYcliCErCUlCmENzWoRwAiSt';
\q
dropdb AtencionVictimas --if-exists
createdb AtencionVictimas
exit
