#!/usr/bin/env bash

testStreamsCount=$1

[[ -z $testStreamsCount ]] && testStreamsCount=1
google-chrome http://nginx/subscriber.html 2>&1 >/dev/null
sleep 20
# Open headless chrome with subscriber.html to test
echo "Opening $testStreamsCount copies of headless google chrome browsers"
for ((i = 1; i <= $testStreamsCount; i++)); do
  google-chrome http://nginx/subscriber.html
done