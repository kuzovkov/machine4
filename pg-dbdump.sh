#!/bin/sh

##############################
# Store PG database to  dump #
##############################

DB_USER=parser
DB_PASS=Admin123456
DB_NAME=courses
DUMP_NAME=dump.sql.gz

sudo docker-compose exec db sh -c "echo localhost:5432:*:$DB_USER:$DB_PASS > ~/.pgpass && chmod 0600 ~/.pgpass";
sudo docker-compose exec db sh -c "pg_dump -Fc -U $DB_USER -h localhost -p 5432 $DB_NAME > /dumps/$DUMP_NAME";
sudo docker-compose exec db sh -c "rm ~/.pgpass";