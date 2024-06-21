#!/bin/bash

DATABASE_NAME=${DATABASE_NAME:-stage}
USERNAME=${USERNAME:-root}
PASSWORD=${PASSWORD:-Azerty1!}
HOST=${HOST:-172.29.240.1}

for file in ../migration/*.sql
do
    mysql --host=$HOST --user=$USERNAME --password=$PASSWORD $DATABASE_NAME < $file
done