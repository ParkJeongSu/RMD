<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

// 반응형 디스플레이
const { mobile, mdAndUp } = useDisplay();

const drawer = ref(false);
const showDialog = ref(false);  // 다이얼로그 상태
</script>

<template>
    <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>mdi-menu-open</v-icon></v-app-bar-nav-icon>

        <v-toolbar-title>RealTime Model DashBoard</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- 반응형 버튼: md 이상에서만 보임 -->
        <template v-if="mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
            <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>

    </v-app-bar>

    <!-- 모바일에서만 네비게이션 드로어 하단으로 이동 -->
    <v-navigation-drawer v-model="drawer" :location="mobile ? 'bottom' : undefined" temporary>
        <v-list>
            <v-list-item>
                <v-btn block color="primary" @click="showDialog = true">
                    Open Dialog
                </v-btn>
            </v-list-item>
        </v-list>

        <!-- Dialog -->
        <v-dialog v-model="showDialog" width="500">
            <v-card>
                <v-card-title class="headline">Dialog Title</v-card-title>
                <v-card-text>
                    This is a sample dialog triggered by the sidebar button.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-navigation-drawer>
</template>

<style></style>
