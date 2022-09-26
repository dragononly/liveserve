npx prisma generate
#pack tool
npm i ttypescript -g 


ENV DEMO
DATABASE_URL="mysql://<USER>:<PWD>@172.18.2.90:3306/poadb_user"
KEY="KEY"
MONGODB="mongodb://<USER>:<PWD>@172.18.0.106:27017/strapi"
PORT="9001"
pm2Many=false


bug
npx prisma generate 运行的时候
env文件在最外层目录