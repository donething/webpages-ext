import {createRoot} from 'react-dom/client'
import styles from "./style.css?inline"
import {Button} from "@/components/ui/button"
import {useToast} from "@/components/ui/use-toast"
import React from "react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {ToastAction} from "@/components/ui/toast"
import {Toaster} from "@/components/ui/toaster"

const app = document.createElement("div")
document.body.appendChild(app)

// Create a Shadow DOM for the rootContainer
const shadowRootContainer = app.attachShadow({mode: "open"})

// create the style element to attach the styles from tailwind
const styleElement = document.createElement("style")
styleElement.innerHTML = styles

// append it to the shadow dom
shadowRootContainer.appendChild(styleElement)

const root = createRoot(shadowRootContainer)

const Comp = React.memo(() => {
  const {toast} = useToast()

  const handleClick = () => {
    console.log("点击了按钮")
    toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      ),
    })
  }

  return (
    <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
      <Toaster/>

      <Button variant="outline" onClick={handleClick}>Show Toast</Button>

      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      <span>content script loaded</span>
    </div>
  )
})
Comp.displayName = "Comp"

root.render(<Comp/>)

try {
  console.log("content script loaded")
} catch (e) {
  console.error(e)
}
