#!/bin/bash

cd /app/view
npm install --production && npm run build

cd /app
npm install --production && ./server.js
