/**
 * 通知页面
 */
import {HelloInfo} from "./types"
import {NS_KEY_HELLO} from "@pages/content/nodeseek/constants"

const TAG = "[NSNotication]"

// 发送 hello 消息
const sendHello = async (helloInfo: HelloInfo) => {
  const content = `你好，关于帖子\n> [${helloInfo.title}](${helloInfo.url})`

  const data = {
    receiverUid: helloInfo.authorID,
    content: content,
    markdown: true
  }
  const resp = await fetch("/api/notification/message/send", {
    "body": JSON.stringify(data),
    "method": "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const result = await resp.json()
  if (!result.success) {
    console.log(TAG, "发送 hello 消息失败:", JSON.stringify(result))
    return
  }

  console.log(TAG, `已发送 hello 消息：'${content}'`)
}

// 当存在来源帖时，先说来源帖的链接
const sayHello = async () => {
  // 从存储中读取需要发送消息的信息
  const helloInfoStr = localStorage.getItem(NS_KEY_HELLO)
  if (!helloInfoStr) {
    console.log(TAG, "没有源窗口的标题、URL、作者等信息，不用发送 hello 消息")
    return
  }
  const helloInfo: HelloInfo = JSON.parse(helloInfoStr)
  console.log(TAG, "首次发送消息前，先说 hello 消息", helloInfo)

  // 直接删除旧的信息，不用等发完消息
  localStorage.removeItem(NS_KEY_HELLO)

  // 修改发送按钮的提示、监听点击事件来发送 hello 消息
  const sendBn = document.querySelector(".message-input button")
  if (sendBn) {
    const orign = sendBn.textContent
    sendBn.textContent = orign + "[含源贴]"

    sendBn.addEventListener("click", async () => {
      await sendHello(helloInfo)
      sendBn.textContent = orign
    }, true)
  }
}

// 执行
const start = () => {
  if (window.location.hash.startsWith("#/message")) {
    sayHello()
  }
}

start()
