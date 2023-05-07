#!/bin/bash

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_INITDB_DATABASE=falconapidb

echo "########### Creating DB and user ###########"
mongo --eval "dbAdmin = db.getSiblingDB('admin'); user = dbAdmin.getUser('$MONGO_INITDB_ROOT_USERNAME'); if (user == null) { dbAdmin.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }], mechanisms: ['SCRAM-SHA-1']}); dbAdmin.auth({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', mechanisms: ['SCRAM-SHA-1'], digestPassword: true }); } db = new Mongo().getDB('$MONGO_INITDB_DATABASE'); db.createCollection('user', { capped: false });"

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db ${MONGO_INITDB_DATABASE} --collection user --file /tmp/data/data.json --authenticationDatabase admin --username ${MONGO_INITDB_ROOT_USERNAME} --password ${MONGO_INITDB_ROOT_PASSWORD}
