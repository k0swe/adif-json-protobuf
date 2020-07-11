#!/bin/bash
if ! command -v protoc &> /dev/null; then
  echo "Need to install protobuf-compiler"
  sudo apt install protobuf-compiler
fi
if ! command -v protoc-gen-jsonschema &> /dev/null; then
  echo "Need to install protoc-gen-jsonschema"
  go get github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema
fi

protoc --jsonschema_out=./jsonschema/ --python_out=./demo/ adif.proto
