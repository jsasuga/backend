#!/bin/bash

PORT=$1

if [[ "$PORT" == "" ]]; then
    echo "you must supply a PORT param"
    exit 1
fi

sudo netstat -pntl | grep $PORT | awk -F " " '{print $7}' | awk -F "/" '{print $1}' | sudo xargs kill || true
