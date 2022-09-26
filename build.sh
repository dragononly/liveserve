#!/bin/bash
set -e

rm -rf build/Release dist
ttsc -P tsconfig.json
#复制文件夹
$(cp -a ./prisma build/Release/)
#复制文件
$(cp ./{package.json,compose.yml,.env,prisma} build/Release/ > /dev/null 2>&1) & \
echo ''
