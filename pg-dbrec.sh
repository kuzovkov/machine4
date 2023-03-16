#!/bin/sh

##################################
# Recovery PG database from dump #
##################################

DB_USER=parser
DB_PASS=Admin123456
DB_NAME=courses
DUMP_NAME=dump.sql.gz

sudo docker-compose exec db sh -c "echo localhost:5432:*:$DB_USER:$DB_PASS > ~/.pgpass && chmod 0600 ~/.pgpass";
sudo docker-compose exec db sh -c "dropdb -U $DB_USER -h localhost -p 5432 $DB_NAME";
sudo docker-compose exec db sh -c "createdb -U $DB_USER -h localhost -p 5432 -O $DB_USER -T template0 $DB_NAME";
sudo docker-compose exec db sh -c "pg_restore -U $DB_USER -h localhost -p 5432 -d $DB_NAME /dumps/$DUMP_NAME";
sudo docker-compose exec db sh -c "rm ~/.pgpass";