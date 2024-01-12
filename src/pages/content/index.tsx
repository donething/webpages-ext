import { createRoot } from 'react-dom/client';
import styles from "./style.css?inline";

const div = document.createElement("div");
div.id = "__root";

// document.body.appendChild(div);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Options root element");

// Create a Shadow DOM for the rootContainer
const shadowRootContainer = rootContainer.attachShadow({ mode: "open" });

// create the style element to attach the styles from tailwind
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;

// append it to the shadow dom
shadowRootContainer.appendChild(styleElement);

const root = createRoot(shadowRootContainer);
root.render(
  <div className='absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50'  >
    content script loaded
  </div>
);

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
