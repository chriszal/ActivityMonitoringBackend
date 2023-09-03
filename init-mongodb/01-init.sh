#!/bin/bash

MONGO_USERNAME=$MONGO_INITDB_ROOT_USERNAME
MONGO_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
MONGO_DATABASE=$MONGO_INITDB_DATABASE

echo "########### Creating DB and user ###########"
mongo --eval "dbAdmin = db.getSiblingDB('admin'); user = dbAdmin.getUser('$MONGO_USERNAME'); if (user == null) { dbAdmin.createUser({ user: '$MONGO_USERNAME', pwd: '$MONGO_PASSWORD', roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }], mechanisms: ['SCRAM-SHA-1']}); dbAdmin.auth({ user: '$MONGO_USERNAME', pwd: '$MONGO_PASSWORD', mechanisms: ['SCRAM-SHA-1'], digestPassword: true }); } db = new Mongo().getDB('$MONGO_DATABASE'); db.createCollection('user', { capped: false });"

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db ${MONGO_DATABASE} --collection user --file /tmp/data/data.json --authenticationDatabase admin --username ${MONGO_USERNAME} --password ${MONGO_PASSWORD}
