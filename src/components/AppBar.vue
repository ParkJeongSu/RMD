<script setup>
import { ref, reactive } from 'vue';
import { useDisplay } from 'vuetify';
import { disconnectWebSocket } from '@/websocket/websocker';
import axios from 'axios';

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

// file upload
const file = ref(null);

const uploadFile = async () => {
  if (!file.value) {
    alert('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await axios.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert(response.data);
  } catch (error) {
    console.error(error);
    alert('Upload failed.');
  }
};

// 테이블 데이터
const items = ref([
  { typeName: 'Type1', TypeAttribute: 'Attr1', StateName: 'Active', TypeAttributeValue: '10' },
  { typeName: 'Type2', TypeAttribute: 'Attr2', StateName: 'Inactive', TypeAttributeValue: '20' }
]);

// 테이블 헤더
const headers = [
  { title: 'Type Name', value: 'typeName' },
  { title: 'Type Attribute', value: 'TypeAttribute' },
  { title: 'State Name', value: 'StateName' },
  { title: 'Type Attribute Value', value: 'TypeAttributeValue' }
];

// 선택된 항목 및 다이얼로그 상태
const selected = ref([]);
const dialog = ref(false);
const isEdit = ref(false);
const selectedItem = ref(null);

// 수정 / 생성 항목
const editedItem = reactive({
  typeName: '',
  TypeAttribute: '',
  StateName: '',
  TypeAttributeValue: ''
});

// 선택된 행 업데이트
const onRowSelected = (value) => {
  console.log(value);
  selectedItem.value = value.length > 0 ? value[0] : null;
  if (value.length <= 0) {
    selectedItem.value = null;
  }
  else {
    const valueArray = value[0].split("-");
    selectedItem.value = items.value.find(item => item.typeName === valueArray[0] && item.StateName === valueArray[1])
  }
};

// 생성 다이얼로그 열기
const openCreateDialog = () => {
  isEdit.value = false;
  Object.assign(editedItem, { typeName: '', TypeAttribute: '', StateName: '', TypeAttributeValue: '' });
  dialog.value = true;
};

// 수정 다이얼로그 열기
const openEditDialog = () => {
  isEdit.value = true;
  if (selected.value.length > 0) {
    Object.assign(editedItem, selectedItem.value);
    dialog.value = true;
  }
};

// 항목 저장
const saveItem = () => {
  if (isEdit.value) {
    const index = items.value.findIndex(item => item.typeName === editedItem.typeName);
    items.value[index] = { ...editedItem };
  } else {
    items.value.push({ ...editedItem });
  }
  dialog.value = false;
};

// 항목 삭제
const deleteItem = () => {
  selected.value.forEach((selected) => {
    const index = items.value.findIndex(item => item.typeName === selected.typeName);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  });
  selected.value = [];
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

      <!-- Setting Dialog -->
      <v-dialog v-model="SettingDialog" max-width="1000" class="settingdialog">
        <v-card>
          <v-card-title class="headline">Default Factory Name</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-btn class="defaultFactory">A1</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn class="defaultFactory">T1</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn class="defaultFactory">E1</v-btn>
              </v-col>
            </v-row>
          </v-container>

          <v-card-title class="headline">SVG file Upload ( [FactoryName].svg )</v-card-title>
          <v-container>
            <v-file-input v-model="file" label="Select File"></v-file-input>
            <v-btn color="primary" @click="uploadFile">Upload</v-btn>
          </v-container>

          <v-card-title class="headline">RMD Color Setting</v-card-title>
          <v-container>
            <v-card>
              <v-card-title class="d-flex justify-space-between align-center">
                Data Table
                <div>
                  <v-btn color="primary" @click="openCreateDialog">Create</v-btn>
                  <v-btn color="info" class="ml-2" :disabled="!selectedItem" @click="openEditDialog">Edit</v-btn>
                  <v-btn color="error" class="ml-2" :disabled="!selectedItem" @click="deleteItem">Delete</v-btn>
                </div>
              </v-card-title>
              <!--item-value="(item) => `${item.typeName}-${item.StateName}`" -->
              <!--item-value="typeName" -->
              <v-data-table v-model="selected" :headers="headers" :items="items"
                :item-value="(item) => `${item.typeName}-${item.StateName}`" show-select
                @update:model-value="onRowSelected">
              </v-data-table>
            </v-card>

            <!-- Dialog for Create / Edit -->
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  {{ isEdit ? 'Edit Item' : 'Create Item' }}
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-text-field v-model="editedItem.typeName" label="Type Name" required></v-text-field>
                    <v-text-field v-model="editedItem.TypeAttribute" label="Type Attribute" required></v-text-field>
                    <v-text-field v-model="editedItem.StateName" label="State Name" required></v-text-field>
                    <v-text-field v-model="editedItem.TypeAttributeValue" label="Type Attribute Value"
                      required></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="saveItem">Save</v-btn>
                  <v-btn @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="SettingDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
  </div>


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
.settingdialog {
  z-index: 10000;
}

.defaultFactory {
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
