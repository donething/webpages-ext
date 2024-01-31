import React, {SetStateAction, useState} from "react"
import ReactDOM from 'react-dom'

// 控制 Popover 显示的选项
export interface HoverPanelOptions {
  open: boolean;
  content: React.ReactNode | string;
  // 相对位置。注意当指定挂载到`container`时，会以`container`而不是`document.body`计算相对位置
  position: { top: number; left: number }
  // 挂载到指定元素
  // 当 HoverPanel 需要应用源网站的样式时，可设置为`document.body`、`document.querySelector("a")`等；否则留空
  asChild?: Element | DocumentFragment
  // 样式
  styles?: React.CSSProperties
}

// 可在非组件函数中控制 HoverPanel
let showHoverPanel: React.Dispatch<SetStateAction<HoverPanelOptions>>

// 悬浮展示数据
const HoverPanel = React.memo(() => {
  const initialPopoverOptions: HoverPanelOptions = {
    open: false,
    content: "",
    position: {top: 0, left: 0},
    asChild: undefined
  }

  const [options, setOptions] = useState(initialPopoverOptions)

  const panel = React.useMemo(() => {
    if (!options.open) {
      return null
    }

    const styles: React.CSSProperties = {
      position: "absolute",
      top: options.position.top,
      left: options.position.left,
      ...options.styles
    }

    const div = typeof options.content === "string" ?
      <div style={styles} dangerouslySetInnerHTML={{__html: options.content}}/> :
      <div style={styles}>{options.content}</div>

    // 挂载到指定元素
    if (options.asChild) {
      return ReactDOM.createPortal(div, options.asChild)
    }

    return div
  }, [options])

  React.useEffect(() => {
    showHoverPanel = setOptions
  }, [setOptions])

  return panel
})
HoverPanel.displayName = "HoverPanel"

export default HoverPanel
export {showHoverPanel}
