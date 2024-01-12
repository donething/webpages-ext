/**
 * nodeseek 帖子内容页面
 */
import {HelloInfo} from "./types"
import {NS_KEY_HELLO} from "@pages/content/nodeseek/constants"

const TAG = "[NSPost]"

// 扩展操作菜单，发送私信
const extOpMenu = () => {
  console.log(TAG, "扩展操作菜单的功能")

  // 所有作者（发布者、评论者）
  const anchorElems = document.querySelectorAll("div.author-info")
  if (!anchorElems || anchorElems.length === 0) {
    console.log(TAG, "没有找到发布者信息的元素")
    return
  }

  // 发送私信
  const sendMessage = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement
    const authorID = target.dataset.authorId
    const floor = target.dataset.floor
    if (!authorID || !floor) {
      console.log(TAG, "无法提取到作者的ID或楼层号", event.target)
      return
    }

    // 点击私信时，先发送当前网页的URL
    const url = new URL(window.location.href)
    // 去除可能原有的"#楼层号"
    url.hash = ""
    const helloInfo: HelloInfo = {
      authorID: Number(authorID),
      title: document.title,
      url: url.toString() + floor
    }

    localStorage.setItem(NS_KEY_HELLO, JSON.stringify(helloInfo))
    window.open(`/notification#/message?mode=talk&to=${authorID}`, "_blank")
  }

  // 创建元素，点击后打开发送私信的页面
  // const iconURL = chrome.runtime.getURL("/icons/message.svg")
  const createMessageElem = (authorID: string, floor: string, tag: string) => {
    const div = document.createElement("div")
    div.dataset.authorId = authorID
    div.dataset.floor = floor
    div.dataset[tag] = ""
    div.className = "menu-item"
    div.onclick = sendMessage

    // const img = document.createElement("img")
    // img.dataset[tag] = ""
    // img.className = "iconpark-icon"
    // img.src = iconURL

    const span = document.createElement("span")
    span.dataset[tag] = ""
    span.textContent = "💌 私信"

    div.append(span)
    return div
  }

  // 遍历发布者元素，增加发送私信
  for (const authorElem of anchorElems) {
    // 作者主页，用于获取作者的ID
    const href = authorElem.querySelector("a.author-name")
      ?.getAttribute("href")
    const authorIDResult = href?.match(/\/(\d+)/)
    if (!authorIDResult || authorIDResult.length < 2) {
      console.log(TAG, `没有匹配到作者的ID：'${href}'`)
      return
    }
    // 作者的ID
    const authorID = authorIDResult[1]

    // 楼层号
    const floorElem = authorElem.closest(".content-item")?.querySelector("a.floor-link")
    if (!floorElem || !floorElem.textContent) {
      console.log(TAG, "没有找到楼层号元素")
      return
    }
    const floor = floorElem.textContent.trim()

    // 操作菜单
    const menusElem = authorElem.closest(".content-item")
      ?.querySelector("div.comment-menu")
    if (!menusElem) {
      console.log(TAG, "没有找到操作菜单元素")
      return
    }

    // 添加元素到 DOM
    const tag = Array.from(menusElem.attributes).find(m => m.name.startsWith("data-v-"))?.name || ""
    const messageElem = createMessageElem(authorID, floor, tag.substring(tag.indexOf("-") + 1))
    menusElem.append(messageElem)
  }
}

// 扩展功能
const ext = () => {
  extOpMenu()
}

ext()
