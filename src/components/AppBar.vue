<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { disconnectWebSocket } from '@/websocket/websocker';

// 반응형 디스플레이
const { mobile, mdAndUp } = useDisplay();

const drawer = ref(false);
const SettingDialog = ref(false);  // 다이얼로그 상태
const machineLegendDialog = ref(false);  // 다이얼로그 상태
const stockerLegendDialog = ref(false);  // 다이얼로그 상태
const portLegendDialog = ref(false);  // 다이얼로그 상태


import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
  disconnectWebSocket();
};

const isFullScreen = ref(false);

const toggleFullScreen = () => {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().then(() => {
      isFullScreen.value = true;
    });
  } else {
    document.exitFullscreen().then(() => {
      isFullScreen.value = false;
    });
  }
};


</script>

<template>
  <div class="app-bar-wrapper">
    <v-app-bar color="primary" prominent class="app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>mdi-menu-open</v-icon></v-app-bar-nav-icon>

      <v-toolbar-title>RealTime Model DashBoard</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 반응형 버튼: md 이상에서만 보임 -->
      <template v-if="mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
        <v-btn @click="toggleFullScreen" :icon="isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          color="blue"></v-btn>
      </template>
      <!-- 햄버거 모양-->
      <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
      <!-- 메뉴 버튼 -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text"></v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-btn block color="primary" @click="SettingDialog = true">
              Setting
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block color="primary" @click="router.push('/login')">
              LogIn
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block color="primary" @click="handleLogout">
              LogOut
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
  <!-- Setting Dialog -->
  <v-dialog v-model="SettingDialog" max-width="1000">
    <v-card>
      <v-card-title class="headline">Default Factory Name</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn class ="defaultFactory">A1</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn class ="defaultFactory">T1</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn class ="defaultFactory">E1</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-card class="pa-3" elevation="4">
              <v-card-title>Run</v-card-title>
              <v-btn>A1</v-btn>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card class="pa-3" elevation="4">
              <v-card-title>Down</v-card-title>
              <v-btn class="machine-down-btn"></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title class="headline">CommunicationState</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-card class="pa-3" elevation="4">
              <v-card-title>OffLine</v-card-title>
              <v-btn class="machine-offLine-btn"></v-btn>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card class="pa-3" elevation="4">
              <v-card-title>OnLine</v-card-title>
              <v-btn class="machine-onLine-btn"></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="SettingDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 모바일에서만 네비게이션 드로어 하단으로 이동 -->
  <v-navigation-drawer v-model="drawer" :location="mobile ? 'bottom' : undefined" temporary>
    <v-list>
      <v-list-item>
        <v-btn block color="primary" @click="machineLegendDialog = true">
          Machine Legend
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn block color="primary" @click="stockerLegendDialog = true">
          Stocker Legend
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn block color="primary" @click="portLegendDialog = true">
          Port Legend
        </v-btn>
      </v-list-item>
    </v-list>

    <!-- Machine Dialog -->
    <v-dialog v-model="machineLegendDialog" max-width="1000">
      <v-card>
        <v-card-title class="headline">MachineState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-run-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-down-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-title class="headline">CommunicationState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>OffLine</v-card-title>
                <v-btn class="machine-offLine-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>OnLine</v-card-title>
                <v-btn class="machine-onLine-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="machineLegendDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Stocker Dialog -->
    <v-dialog v-model="stockerLegendDialog" max-width="1000">
      <v-card>
        <v-card-title class="headline">StockerState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-run-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-down-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-title class="headline">CommunicationState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-offLine-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-onLine-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="stockerLegendDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Port Dialog -->
    <v-dialog v-model="portLegendDialog" max-width="1000">
      <v-card>
        <v-card-title class="headline">PortState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-run-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-down-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-title class="headline">CommunicationState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-offLine-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-onLine-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-title class="headline">CommunicationState</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Run</v-card-title>
                <v-btn class="machine-offLine-btn"></v-btn>
              </v-card>
            </v-col>
            <v-col cols="2">
              <v-card class="pa-3" elevation="4">
                <v-card-title>Down</v-card-title>
                <v-btn class="machine-onLine-btn"></v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="portLegendDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<style scoped>


.defaultFactory{
  width: 100%;
  height: 100%;
}
/* AppBar 초기 상태 - 숨김 */
.app-bar-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  /* AppBar 높이 */
  overflow: hidden;
  z-index: 1000;
}

/* AppBar 숨기기 */
.app-bar {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
  /* 숨김 상태에서는 클릭 방지 */
}

/* 마우스 호버 시 AppBar 나타남 */
.app-bar-wrapper:hover .app-bar {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  /* 보일 때는 클릭 가능 */
}



.machine-run-btn {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  padding: 0;
  border-radius: 8px;
  color: #000000;
  background-color: #4caf50;
}

.machine-down-btn {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  padding: 0;
  border-radius: 8px;
  color: #000000;
  background-color: #ff0000;
}

.machine-onLine-btn {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  padding: 0;
  border-radius: 8px;
  color: #000000;
  background-color: #ffffff;
  border: 4px solid #00ff73;
}

.machine-offLine-btn {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  padding: 0;
  border-radius: 8px;
  color: #000000;
  background-color: #ffffff;
  border: 4px solid #ff0000;
}
</style>
