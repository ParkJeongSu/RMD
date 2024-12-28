<template>
    <v-navigation-drawer app permanent>
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

<script setup>
import { ref } from 'vue';

const showDialog = ref(false);  // 다이얼로그 상태
</script>

<style>
.v-navigation-drawer {
    z-index: 1000;
    /* 다른 요소보다 앞에 보이도록 설정 */
}
</style>
