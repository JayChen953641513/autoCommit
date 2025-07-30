PATH=/www/server/nodejs/v22.17.0/bin:/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

export 
export NODE_PROJECT_NAME="githubAutoCOmmit"
cd /www/wwwroot/github-auto-commit
nohup /www/server/nodejs/v22.17.0/bin/node /www/wwwroot/github-auto-commit/githubAutoCommit.js  &>> /www/wwwlogs/nodejs/githubAutoCOmmit.log &
echo $! > /www/server/nodejs/vhost/pids/githubAutoCOmmit.pid
