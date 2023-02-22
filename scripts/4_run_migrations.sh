#!/bin/bash

# run migration
cd ~/backend/
yarn migration:run

echo "-----MIGRATIONS FINISHED RUNNING-----"
