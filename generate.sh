#!/usr/bin/env bash

if ! type json2ts &> /dev/null
then
    echo "json2ts could not be found"
    exit 1
fi
json2ts -i content-config-schema.json -o src/types/contentTypes.ts
