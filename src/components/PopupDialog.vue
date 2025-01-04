<script setup>
import { computed, onMounted, ref } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
defineEmits(['close'])

const props = defineProps({
  visible: Boolean,
  target: Object
});

const type = computed(() => props.target?.getAttribute('type'));
const objectName = computed(() => props.target?.getAttribute('id'));

const items = [
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  }
];
const desserts = ref(
  [
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    }
    ,
    {
      name: 'Eclair',
      calories: 262,
    }
    ,
    {
      name: 'Eclair',
      calories: 262,
    }
    ,
    {
      name: 'Eclair',
      calories: 262,
    }
    ,
    {
      name: 'Eclair',
      calories: 262,
    }
    ,
    {
      name: 'Eclair',
      calories: 262,
    }
  ]
)
onMounted(() => {
  console.log(`컴포넌트가 마운트 됐습니다.`)
  desserts.value.push({
    name: 'test',
    calories: 262,
  });

})

// 초기 비율 설정
const leftSize = ref(33.33);
const rightSize = ref(66.66);

</script>
<template>
  <v-dialog v-if="visible === true && type === 'Machine'" :model-value="visible" max-width="1000px"
    @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Machine
      </v-card-title>
      <v-container fluid class="split-container">
        <!-- horizontal 속성 추가로 좌우 분할 -->
        <splitpanes class="default-theme">
          <!-- 왼쪽 Pane (테이블) -->
          <pane :size="leftSize">
            <v-card>
              <v-card-title>
                Machine Value
              </v-card-title>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </pane>
          <!-- 오른쪽 Pane -->
          <pane :size="rightSize">
            <v-container fluid class="split-container">
              <splitpanes horizontal class="default-theme">
                <pane :size="50">
                  <v-card class="scrollable-pane">
                    <v-card-title>
                      SubMachine List
                    </v-card-title>
                    <v-data-table :items="items" show-expand></v-data-table>
                  </v-card>
                </pane>
                <pane :size="50">
                  <v-card class="scrollable-pane">
                    <v-card-title>
                      Port List
                    </v-card-title>
                    <v-data-table :items="items" show-expand></v-data-table>
                  </v-card>
                </pane>
              </splitpanes>
            </v-container>
          </pane>
        </splitpanes>
      </v-container>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-if="visible === true && type === 'Stocker'" :model-value="visible" max-width="1000px"
    @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Machine
      </v-card-title>
      <v-container fluid class="split-container">
        <!-- horizontal 속성 추가로 좌우 분할 -->
        <splitpanes class="default-theme">
          <!-- 왼쪽 Pane (테이블) -->
          <pane :size="leftSize">
            <v-card>
              <v-card-title>
                Machine Value
              </v-card-title>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </pane>
          <!-- 오른쪽 Pane -->
          <pane :size="rightSize">
            <v-container fluid class="split-container">
              <v-card class="scrollable-pane">
                <v-card-title>
                  Carrier List
                </v-card-title>
                <v-data-table :items="items" show-expand></v-data-table>
              </v-card>
            </v-container>
          </pane>
        </splitpanes>
      </v-container>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-if="visible === true && type === 'Port'" :model-value="visible" max-width="1000px"
    @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Port
      </v-card-title>
      <v-container fluid class="split-container">
        <v-card>
          <v-card-title>
            Port Value
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-container>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


</template>

<style scoped>
.split-container {
  height: 100vh;
  max-height: 600px;
  /* 최대 높이 설정 */
  background-color: white;
}

.v-card-title {
  /* background-color: white; */
}

.scrollable-pane {
  height: 100%;
  /* v-card-title 높이 만큼 조정 */
  overflow-y: auto;
}

.v-table {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>


<!--

<v-dialog v-else-if="visible === true && type === 'Port'" :model-value="visible" max-width="600px"
    @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Port
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else-if="visible === true && type === 'Stocker'" :model-value="visible" max-width="600px"
    @update:model-value="$emit('close')">
    <v-card>
      <v-card-title>
        Stocker
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
-->
