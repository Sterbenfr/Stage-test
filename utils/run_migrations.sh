#!/bin/bash

DATABASE_NAME=${DB_NAME}
USERNAME=${DB_USER}
PASSWORD=${DB_PASSWORD}
HOST=${DB_HOST}

for file in ${MIGRATION_PATH}/Runable.sql
do
    mysql -h $HOST -u $USERNAME -p$PASSWORD $DATABASE_NAME < $file
done