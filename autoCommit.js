const cron = require("node-cron");
const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const git = simpleGit();
const config = require("./config")
const repoPath = path.join(__dirname);
git.addConfig("user.name", config.gitUserName);
git.addConfig("user.email", config.gitUserEmail);
let fileFlag = true;
// 定义定时任务，每小时执行一次
//cron.schedule("0 * * * *", async () => {
  try {
    console.log("开始推送代码到 git...");
    const fileName = `./testAutoCommit.txt`;
    fs.writeFile(fileName, String(fileFlag), async (err) => {
      if (err) {
        console.error("创建文件时出错:", err);
      } else {
        fileFlag = !fileFlag;
        await git.cwd(repoPath);
        await git.add("./*");
        await git.commit("style: 定时自动提交  🧐");
        await git.push("origin", "master");
      }
    });

    console.log("代码推送成功！");
  } catch (error) {
    console.error("推送失败:", error);
  }
//});

console.log("定时推送服务已启动...");
