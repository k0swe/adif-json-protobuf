#!/bin/bash
if ! command -v protoc &> /dev/null; then
  echo "Need to install protobuf-compiler"
  sudo apt install protobuf-compiler
fi
if ! command -v protoc-gen-jsonschema &> /dev/null; then
  echo "Need to install protoc-gen-jsonschema"
  go get github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema
fi
if ! command -v protoc-gen-go &> /dev/null; then
  echo "Need to install protoc-gen-go"
  go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
fi
if ! command -v protoc-gen-ts &> /dev/null; then
  echo "Need to install protoc-gen-ts"
  npm install -g ts-protoc-gen
fi

protoc \
  --jsonschema_out=./jsonschema/ \
  --python_out=./demo/ \
  --go_out=./go/ \
  --js_out="import_style=commonjs,binary:./js/" \
  --ts_out=./js/ \
  adif.proto
