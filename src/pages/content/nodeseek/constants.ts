import {TAG} from "@src/constants"

// 当从贴子跳转到私信页面时，需要在原贴页面存储页面信息，再在私信页面发送 hello 消息。此为存储的键
export const NS_KEY_HELLO = TAG + "_ns_hello"
