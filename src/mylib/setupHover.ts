/**
 * 鼠标悬浮 元素1 时显示 元素2
 *
 * 注意：如果`hoverElement`是通过`ReactDOM.createPortal`渲染时，此情况调用`setupHover`并不会设置`hoverElement`的鼠标事件，
 * 正确的做法是：先创建一个容器`div`，并且使用`document.body.append()`添加到`document`，
 * 再使用`ReactDOM.createPortal`渲染内容到该容器`div`中
 * @param triggerElement 触发元素
 * @param hoverElement 悬浮显示的元素
 * @param onHoverIn 悬浮后触发的回调
 * @param onHoverOut 离开悬浮的 元素1 和显示的 元素2 后触发的回调
 * @param hoverDelay 悬浮时长（默认 300 毫秒）
 */
const setupHover = (triggerElement: HTMLElement,
                    hoverElement: HTMLElement,
                    onHoverIn: (triggerElement: HTMLElement, hoverElement: HTMLElement) => void,
                    onHoverOut: (hoverElement: HTMLElement) => void,
                    hoverDelay = 300) => {
  let isHover = false         // 是否悬浮在触发元素、显示元素中
  let isHoverShowing = false  // 是否显示元素正在显示中
  let timerIn: number   // 悬浮在触发元素上的计时器
  let timerOut: number  // 离开显示元素的计时器。用于有时间在触发元素和现实元素中穿梭鼠标

  triggerElement.addEventListener('mouseover', function () {
    isHover = true
    if (isHoverShowing) return

    timerIn = window.setTimeout(function () {
      if (isHover) {
        onHoverIn(triggerElement, hoverElement)
        isHoverShowing = true
      }
    }, hoverDelay)
  })

  triggerElement.addEventListener('mouseout', function () {
    isHover = false
    if (timerIn) {
      window.clearTimeout(timerIn)
    }
    timerOut = window.setTimeout(function () {
      if (!isHover) {
        onHoverOut(hoverElement)
        isHoverShowing = false
      }
    }, 100)
  })

  hoverElement.addEventListener('mouseover', function () {
    if (timerOut) {
      window.clearTimeout(timerOut)
    }
    isHover = true
  })

  hoverElement.addEventListener('mouseout', function () {
    isHover = false
    timerOut = window.setTimeout(function () {
      if (!isHover) {
        onHoverOut(hoverElement)
        isHoverShowing = false
      }
    }, 100)
  })
}

export default setupHover
