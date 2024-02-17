// 当存在来源帖时，先说来源帖的链接

!(function () {
  const TAG = "[NSNotication]"
  const NS_KEY_HELLO = "WPE_ns_hello"

  // 从存储中读取需要发送消息的信息
  const helloInfoStr = localStorage.getItem(NS_KEY_HELLO)
  if (!helloInfoStr) {
    console.log(TAG, "没有源窗口的标题、URL、作者等信息，不用发送 hello 消息")
    return
  }
  const helloInfo = JSON.parse(helloInfoStr)
  console.log(TAG, "首次发送消息前，开始说 hello 消息", helloInfo)

  // 直接删除旧的信息，不用等发完消息
  localStorage.removeItem(NS_KEY_HELLO)

  // 向输入框注入 Markdown hello 文本
  // 参考 https://greasyfork.org/zh-CN/scripts/487416
  const codeMirrorElement = document.querySelector(".CodeMirror")
  if (!codeMirrorElement) {
    console.log(TAG, "没有找到 CodeMirror Element")
    return
  }
  // 等待 codeMirrorInstance 被创建
  const codeMirrorInstance = codeMirrorElement.CodeMirror
  if (!codeMirrorInstance) {
    console.log(TAG, "没有获取到 CodeMirror 的实例：", codeMirrorElement)
    return
  }

  // 注入 hello 文本
  const cursor = codeMirrorInstance.getCursor()
  const content = `嗨，关于帖子 [${helloInfo.title}](${helloInfo.url})\n-------\n`
  codeMirrorInstance.replaceRange(content, cursor)

  // 优先使用上面的“向输入框注入 Markdown hello 文本”
  // 修改发送按钮的提示、监听点击事件来发送 hello 消息
  // const sendBn = document.querySelector(".message-input button")
  // if (sendBn) {
  //   const orign = sendBn.textContent
  //   sendBn.textContent = orign + "[含源贴]"
  //
  //   sendBn.addEventListener("click", async () => {
  //     sendBn.textContent = orign
  //
  //     sendHello(helloInfo).then(() => {
  //       console.log(TAG, "已发送 hello 消息", helloInfo)
  //       toast({title: "已发送 hello 消息"})
  //     }).catch(e => {
  //       console.log(TAG, "发送 hello 消息出错", e)
  //       toast({title: "发送 hello 消息失败", description: typeError(e).message, variant: "destructive"})
  //     })
  //   }, true)
  // }
})()
