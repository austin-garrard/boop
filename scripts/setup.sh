#!/usr/bin/env bash

yarn install

yarn db:init
NODE_ENV=test yarn db:init

yarn test

