import React from "react"
import {Toaster} from "@/components/ui/toaster"
import injectComps from "@/mylib/inject_comps"
import {toast} from "@/components/ui/use-toast"
import styles from "./style.css?inline"

// 注入 shadcn-ui 的 toast
injectComps(<div><Toaster/></div>, styles)
// 使用 shadcn-ui 的 toast 提示
toast({description: "content script loaded"})

try {
  console.log("content script loaded")
} catch (e) {
  console.error(e)
}
