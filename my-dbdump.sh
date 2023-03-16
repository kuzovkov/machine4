#!/bin/sh

#################################
# Store database MySQL to  dump #
#################################

DB_USER=parser
DB_PASS=Admin123456
DB_NAME=courses
DUMP_NAME=dump.sql.gz

sudo docker-compose exec mysql sh -c "mysqldump -u$DB_USER -p$DB_PASS $DB_NAME | gzip > /dump/$DUMP_NAME"