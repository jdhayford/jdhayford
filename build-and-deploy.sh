#!/usr/bin/env bash
NODE_ENV=production npm run build
NODE_ENV=production npm run export
aws s3 sync ./out s3://www.jdhayford.io/ 
aws cloudfront create-invalidation --distribution-id E3I3CFEUHLVGQW --paths "/*"