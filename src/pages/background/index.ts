// service worker 脚本

chrome.runtime.onInstalled.addListener(async () => {
  console.log("扩展已安装：", chrome.runtime.getManifest().name, chrome.runtime.getManifest().author, chrome.runtime.id)
})
