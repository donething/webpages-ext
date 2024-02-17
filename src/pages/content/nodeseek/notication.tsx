/**
 * 通知页面
 */
import styles from "./style.css?inline"
import React from "react"
import {Toaster} from "@/components/ui/toaster"
import injectComps from "@/mylib/inject_comps"
import {insertJSSrc} from "do-utils"

// 发送 hello 消息
// const sendHello = async (helloInfo: HelloInfo): Promise<boolean> => {
//   const content = `你好，关于帖子\n> [${helloInfo.title}](${helloInfo.url})`
//
//   const data = {
//     receiverUid: helloInfo.authorID,
//     content: content,
//     markdown: true
//   }
//   const resp = await fetch("/api/notification/message/send", {
//     "body": JSON.stringify(data),
//     "method": "POST",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   const result = await resp.json()
//   if (!result.success) {
//     throw Error(JSON.stringify(result))
//   }
//
//   return true
// }

// 执行
const start = () => {
  if (window.location.hash.startsWith("#/message")) {
    // 注入 toast 组件
    injectComps(<div><Toaster/></div>, styles)

    // 执行任务
    // 注入私信的 hello 消息
    insertJSSrc(chrome.runtime.getURL("/js/ns_writehello.js"))
  }
}

start()
