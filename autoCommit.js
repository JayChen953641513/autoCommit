const cron = require("node-cron");
const simpleGit = require("simple-git");
const path = require('path');

const fs = require("fs");
// 初始化 simple-git
const git = simpleGit(); // 替换为你的 Git 仓库路径
const repoPath = path.join(__dirname)
console.log(repoPath,111)
let fileId = 0;
// 定义定时任务，每小时执行一次
//cron.schedule("0 * * * *", async () => {
    try {
    console.log("开始推送代码到 GitHub...");
    const fileName = `./gitAutoCommit/${++fileId}.txt`
    fs.writeFile(fileName, '', async (err) => {
      if (err) {
        console.error("创建文件时出错:", err);
      } else {
        await git.cwd(repoPath)
        // 添加所有更改的文件
        await git.add('./*');

        // 提交更改
        await git.commit("定时推送: 自动提交");

        // 推送到远程仓库
        await git.push("origin", "master"); // 替换为你的分支名
      }
    });

    console.log("代码推送成功！");
  } catch (error) {
    console.error("推送失败:", error);
  }
//});

console.log("定时推送服务已启动...");
