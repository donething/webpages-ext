/**
 * 通知页面
 */
import {HelloInfo} from "./types"
import {NS_KEY_HELLO} from "@pages/content/nodeseek/constants"
import styles from "./style.css?inline"
import React from "react"
import {Toaster} from "@/components/ui/toaster"
import injectComps from "@/mylib/inject_comps"
import {toast} from "@/components/ui/use-toast"
import {typeError} from "do-utils"

const TAG = "[NSNotication]"

// 发送 hello 消息
const sendHello = async (helloInfo: HelloInfo): Promise<boolean> => {
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
    throw Error(JSON.stringify(result))
  }

  return true
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
  console.log(TAG, "首次发送消息前，开始说 hello 消息", helloInfo)

  // 直接删除旧的信息，不用等发完消息
  localStorage.removeItem(NS_KEY_HELLO)

  // 修改发送按钮的提示、监听点击事件来发送 hello 消息
  const sendBn = document.querySelector(".message-input button")
  if (sendBn) {
    const orign = sendBn.textContent
    sendBn.textContent = orign + "[含源贴]"

    sendBn.addEventListener("click", async () => {
      sendBn.textContent = orign

      sendHello(helloInfo).then(() => {
        console.log("已发送 hello 消息", helloInfo)
        toast({title: "已发送 hello 消息"})
      }).catch(e => {
        console.log("发送 hello 消息出错", e)
        toast({title: "发送 hello 消息失败", description: typeError(e).message, variant: "destructive"})
      })
    }, true)
  }
}

// 执行
const start = () => {
  if (window.location.hash.startsWith("#/message")) {
    // 注入 toast 组件
    injectComps(<div><Toaster/></div>, styles)

    // 执行任务
    sayHello()
  }
}

start()
