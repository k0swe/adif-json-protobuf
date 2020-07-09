#!/bin/bash
if ! command -v protoc &> /dev/null; then
  echo "Need to install protobuf-compiler"
  sudo apt install protobuf-compiler
fi
if ! command -v protoc-gen-jsonschema &> /dev/null; then
  echo "Need to install protoc-gen-jsonschema"
  go get github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema

  # workaround for https://github.com/chrusty/protoc-gen-jsonschema/issues/11
  pwd=`pwd`
  cd `go env GOPATH`/src/github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema/
  git checkout -t origin/timestamps_as_strings
  go install
  cd $pwd
fi

protoc --jsonschema_out=./jsonschema/ --python_out=./demo/ adif.proto
