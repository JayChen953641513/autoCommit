const cron = require("node-cron");
const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const git = simpleGit();
const repoPath = path.join(__dirname);
const { exec } = require('child_process');
let fileFlag = true;
// 定义定时任务，每小时执行一次
//cron.schedule("0 * * * *", async () => {
  try {
    console.log("开始推送代码到 git...");
    const fileName = `./testAutoCommit.txt`;
    fs.writeFile(fileName, String(fileFlag), (err) => {
      if (err) {
        console.error("创建文件时出错:", err);
      } else {
        fileFlag = !fileFlag;
        exec(
          `sudo -S git add . | 
           sudo -S git commit -m "style: 定时自动提交 🧐" | 
           sudo -S git push
          `,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`执行错误: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`错误输出: ${stderr}`);
              return;
            }
            console.log(`标准输出: ${stdout}`);
          }
        );
      }
    });

    console.log("代码推送成功！");
  } catch (e) {
    console.error("推送失败:", error);
  }
//});

console.log("定时推送服务已启动...");
