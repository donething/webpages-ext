import injectComps from "@/mylib/inject_comps"
import styles from "./style.css?inline"
import {Toaster} from "@/components/ui/toaster"
import {toast} from "@/components/ui/use-toast"
import HoverPanel, {showHoverPanel} from "@/components/my/HoverPanel"
import setupHover from "@/mylib/setupHover"
import Consts from "@/constants"

const TAG = "[NSList]"

const HoverpanelID = `${Consts.TAG}-NSList-Hoverpanel`

// HoverPanel 的样式
const panelCss = {
  opacity: "0.9",
  background: "#f8f8f8",
  color: "#333",
  padding: "0 10px",
  borderRadius: '10px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  width: '600px',
  maxHeight: '350px',
  overflow: 'auto'
}

// 悬浮主题列表的标题时，显示主楼的内容
const hoverTitleDisplayContent = async () => {
  // 需要显示的内容容器
  let container = document.querySelector(`#${HoverpanelID}`) as HTMLElement
  if (!container) {
    container = document.createElement("div")
    container.id = HoverpanelID
    document.body.append(container)
  }

  // 悬浮显示主楼、签名
  const onHoverIn = async (trigger: HTMLElement) => {
    if (!trigger) {
      console.log(TAG, "当前 target 为空")
      toast({description: "当前 target 为空", variant: "destructive"})
      return
    }
    const linkElem = trigger as HTMLLinkElement
    const href = linkElem.href

    // 联网获取帖子的内容
    const resp = await fetch(href)
    const text = await resp.text()

    // 解析主楼和签名两部分
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, "text/html")
    const contentElem = doc.querySelector("div.nsk-post div.post-content")
    const signatureElem = doc.querySelector("div.nsk-post div.signature")

    if (contentElem) {
      const content = contentElem as HTMLElement
      content.style.padding = "0"
      content.style.margin = "0"
    } else {
      console.log(TAG, "没有查找到帖子主楼的内容：\n", text)
      toast({description: "没有查找到帖子主楼的内容", variant: "destructive"})
      return
    }

    // 临时存放签名和内容
    const mainHtml = document.createElement("div")

    // 添加签名
    if (signatureElem) {
      const signature = signatureElem as HTMLElement
      signature.style.position = "sticky"
      signature.style.top = "0"
      signature.style.background = "#F8F8F8"
      signature.style.zIndex = "2147483647"

      const hr = document.createElement("hr")
      signatureElem.append(hr)
      mainHtml.append(signatureElem)
    }
    // 添加内容
    mainHtml.append(contentElem)

    // 显示主楼
    const rect = linkElem.getBoundingClientRect()

    // 计算 panel 显示的位置
    const top = rect.bottom + window.scrollY + linkElem.clientHeight + 2
    const position = {top: top, left: rect.left + 30}

    // 显示浮动框
    showHoverPanel({
      open: true,
      content: mainHtml.innerHTML,
      position: position,
      asChild: container,
      styles: panelCss
    })
  }
  // 关闭显示
  const onHoverOut = async () => {
    showHoverPanel({open: false, content: "", position: {top: 0, left: 0}})
  }

  // 变量列表的所有主题，增加悬浮事件
  const topicsItems = Array.from(document.querySelectorAll("li.post-list-item div.post-title a"))
  for (const item of topicsItems) {
    setupHover(item as HTMLElement, container, onHoverIn, onHoverOut)
  }
}

const start = async () => {
  const path = location.pathname
  // 需要运行的页面
  if (path === "/" || path.startsWith("/categories/") || path.startsWith("/search")) {
    // 注入 toast 组件
    injectComps(<div>
      <Toaster/>
      <HoverPanel/>
    </div>, styles)

    await hoverTitleDisplayContent()
  }
}

start()
