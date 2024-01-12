import React from "react"
import {createRoot} from 'react-dom/client'

/**
 * 向网页注入组件。将在 `Shadow DOM`中创建
 * @param comps 组件。如 `<div> <Toaster/> <Button>点击按钮</Button> </div>`
 * @param styles 样式。如 `import styles from "./style.css?inline"`后，传递 `styles`
 */
const injectComps = (comps: React.ReactNode, styles?: string) => {
  const app = document.createElement("div")
  document.body.appendChild(app)

  // Create a Shadow DOM for the rootContainer
  const shadowRootContainer = app.attachShadow({mode: "open"})

  // create the style element to attach the styles from tailwind
  if (styles) {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = styles

    // append it to the shadow dom
    shadowRootContainer.appendChild(styleElement)
  }

  const root = createRoot(shadowRootContainer)
  root.render(comps)
}

export default injectComps
