export default class WebSocketService {
  constructor (url) {
    this.url = url
    this.ws = null
    this.isConnected = false
  }

  connect (onOpenCallback) {
    this.ws = new WebSocket(this.url)

    // 当 WebSocket 连接打开时
    this.ws.onopen = () => {
      console.log('WebSocket 连接成功')
      this.isConnected = true
      if (onOpenCallback) {
        onOpenCallback() // 在连接成功时执行回调
      }
    }

    // 监听 WebSocket 消息
    this.ws.onmessage = (event) => {
      if (this.handleMessage) {
        this.handleMessage(event.data)
      }
    }

    // 当 WebSocket 连接关闭时
    this.ws.onclose = () => {
      this.isConnected = false
      console.warn('WebSocket 连接已关闭')
    }

    // 当 WebSocket 出现错误时
    this.ws.onerror = (error) => {
      console.error('WebSocket 错误: ', error)
    }
  }

  sendMessage (message) {
    if (this.isConnected) {
      this.ws.send(message)
      console.log('消息已发送: ', message)
    } else {
      console.warn('WebSocket 连接尚未建立，无法发送消息')
    }
  }

  close () {
    if (this.ws) {
      this.ws.close()
    }
  }
}
