#!/bin/bash

DATABASE_NAME=stage
USERNAME=root
PASSWORD=Azerty1!
HOST=172.29.240.1

for file in ../migration/Runable.sql
do
    mysql --host=$HOST --user=$USERNAME --password=$PASSWORD $DATABASE_NAME < $file
done