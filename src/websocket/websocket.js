import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useSvgStore } from '@/stores/svgStore'
import { createPinia, setActivePinia } from 'pinia'

// Pinia 인스턴스 설정
const pinia = createPinia()
setActivePinia(pinia)

// global을 직접 window로 바인딩
if (typeof global === 'undefined') {
  window.global = window
}
let stompClient = null
let reconnectAttempts = 0
const maxReconnectAttempts = 1000

function reconnectWebSocket() {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++
    const reconnectDelay = Math.min(3000 * 2 ** reconnectAttempts, 60000) // 최대 1분 이내 연결 재시도 간격 설정
    console.log(`WebSocket 재연결 시도 (${reconnectAttempts}/${maxReconnectAttempts})`)
    setTimeout(() => {
      connectWebSocket()
    }, reconnectDelay)
  } else {
    console.log('WebSocket 재연결 초과')
  }
}

export function connectWebSocket() {
  const svgStore = useSvgStore()

  const socket = new SockJS('http://localhost:8082/ws')

  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('WebSocket 연결 성공!')

      //구독 설정 (서버에서 메시지 수신)
      stompClient.subscribe('/topic/state', (message) => {
        svgStore.updateSvgColor(message.body)
        console.log('메시지 수신: ', message.body)
      })
    },
    onDisconnect: () => {
      console.log('WebSocket 비정상적으로 종료 다시 연결 시도')
      reconnectWebSocket()
    },
    onclose: () => {
      console.log('WebSocket 연결 다시 시도')
      reconnectWebSocket()
    },
    onWebSocketClose: () => {
      // WebSocket 종료 감지
      console.log('WebSocket 물리적 연결 종료')
      reconnectWebSocket()
    },
  })

  stompClient.activate()
}

// 웹소켓 연결 종료
export function disconnectWebSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate()
    console.log('WebSocket 비활성화')
  }
}
