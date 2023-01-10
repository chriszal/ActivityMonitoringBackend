#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db falconapidb --collection user --file /tmp/data/data.json