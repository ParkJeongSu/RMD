import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSvgStore } from '@/stores/svgStore';
import { createPinia, setActivePinia } from 'pinia';

// Pinia 인스턴스 설정
const pinia = createPinia();
setActivePinia(pinia);

// global을 직접 window로 바인딩
if (typeof global === "undefined") {
  window.global = window;
}
let stompClient = null;

export function connectWebSocket() {

  const svgStore = useSvgStore();

  const socket = new SockJS("http://localhost:8082/ws");
  
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("WebSocket 연결 성공!");

      //구독 설정 (서버에서 메시지 수신)
      stompClient.subscribe("/topic/state", (message) => {
        
        svgStore.updateSvgColor(message.body);
        console.log("메시지 수신: ", message.body);
      });
    },
    onDisconnect: () => {
      console.log("WebSocket 연결 종료");
    },
    onclose : ()=>{
      setTimeout( () => {
        console.log("WebSocket 연결 성공!");
  
        // 구독 설정 (서버에서 메시지 수신)
        stompClient.subscribe("/topic/state", (message) => {
          svgStore.updateSvgColor(message.body);
          console.log("메시지 수신: ", message.body);
        });
      } ,5000);
    }
  });

  stompClient.activate();
}

// 웹소켓 연결 종료
export function disconnectWebSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log("WebSocket 비활성화");
  }
}
