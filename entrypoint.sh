#!/bin/bash

echo $GOOGLE_JSON_KEY > encoded_json.key
base64 --decode encoded_json.key > json.key
gcloud auth activate-service-account --key-file=json.key
gcloud --quiet auth configure-docker
gcloud --quiet config set project oi-tset
gcloud --quiet container clusters get-credentials production --zone europe-west3-a
helm init -c
