#!/bin/sh

#####################################
# Recovery database MySQL from dump #
#####################################

DB_USER=parser
DB_PASS=Admin123456
DB_NAME=courses
DUMP_NAME=dump.sql.gz

sudo docker-compose exec mysql mysql -u$DB_USER -p$DB_PASS -e "DROP DATABASE IF EXISTS $DB_NAME"
sudo docker-compose exec mysql mysql -u$DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS $DB_NAME"
sudo docker-compose exec mysql sh -c "gunzip < /dump/$DUMP_NAME | mysql -u$DB_USER -p$DB_PASS $DB_NAME"
