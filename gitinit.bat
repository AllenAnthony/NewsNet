call git init
call git add .
call git commit -m "first commit"
call git remote add origin %1
call git pull
call git pull origin master
call git pull --rebase origin master
call git push -u origin master
