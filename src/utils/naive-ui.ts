import { createDiscreteApi } from 'naive-ui'

export default () => {
  // 处理tailwind的reset样式和naive-ui中button等组件样式冲突
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  const { message, dialog, notification, loadingBar } = createDiscreteApi([
    'message',
    'dialog',
    'notification',
    'loadingBar'
  ])
  window.$message = message
  window.$dialog = dialog
  window.$notification = notification
  window.$loadingBar = loadingBar
}
