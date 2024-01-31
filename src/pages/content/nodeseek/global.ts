// 禁用跳转页面
const disableJump = () => {
  const jumpLinks: HTMLLinkElement[] = Array.from(document.querySelectorAll("a[href^='/jump?']"))
  for (const link of jumpLinks) {
    link.href = window.decodeURIComponent(link.href.substring(link.href.lastIndexOf("=") + 1))
  }
}

disableJump()
