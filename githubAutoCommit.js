const cron = require("node-cron");
const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const git = simpleGit();
const config = require("./config")
const to = require("await-to-js").default
const repoPath = path.join(__dirname);
git.addConfig("user.name", config.gitUserName);
git.addConfig("user.email", config.gitUserEmail);
const fileName = `./testAutoCommit.txt`;
let fileFlag = true;
//每天提交次数,将于每日0点更新该数 1 < num < 24
let autoSubmitCount = 23
// 定义定时任务，每小时执行一次 
//一分钟一次：0 * * * * *
//一小时一次: 0 * * * *


cron.schedule("0 * * * *", async function ()  {
  const hour = new Date().getHours()
  console.log("当前时间:", hour, "点")
  if (hour === 0) {
    autoSubmitCount = random(1, 23)
  }
  if (hour > autoSubmitCount) {
    return
  }
  
  
  try {
    console.log("开始推送代码到 git...");
    fs.writeFile(fileName, String(fileFlag), async function(err) {
      if (err) {
        console.error("创建文件时出错:", err);
      } else {
        fileFlag = !fileFlag;
        const [cwdErr] = await to(git.cwd(repoPath))
        if (cwdErr) { console.log("初始化代码失败:", cwdErr) }

        const [addErr] = await to(git.add("./*"))
        if (addErr) { console.log("添加代码失败:", addErr) }

        const [commitErr] = await to(git.commit("style: 定时自动提交  🧐"))
        if (commitErr) { console.log("提交代码失败:", commitErr) }

        const [pushErr] = await to(git.push("origin", "master"))
        if (pushErr) { console.log("推送代码失败:", pushErr) }
        // await git.cwd(repoPath);
        // await git.add("./*");
        // await git.commit("style: 定时自动提交  🧐");
        // await git.push("origin", "master").catch((err)=>{
        //     console.log("提交代码失败:",err)
        // });
        // console.log("代码推送成功！");
      }
    });
  } catch (error) {
    console.error("推送失败:", error);
  }
});
//随机数范围 [min , max]
const random = (min, max) => {
  return Math.floor((max + 1 - min) * Math.random() + min)
}
console.log("定时推送服务已启动...");
