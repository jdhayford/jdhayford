#!/usr/bin/env bash
npm run build
aws s3 sync ./build s3://www.jdhayford.io/ 
aws cloudfront create-invalidation --distribution-id E3I3CFEUHLVGQW --paths "/*"