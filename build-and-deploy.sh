#!/usr/bin/env bash
npm run build
aws s3 sync ./build s3://www.strumpad.com/ 
aws cloudfront create-invalidation --distribution-id E1EEFA4DUWAG9R --paths "/*"