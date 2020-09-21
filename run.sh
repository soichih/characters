#!/bin/bash

cd /app/view
npm install && npm run build

cd /app
npm install && ./server.js
