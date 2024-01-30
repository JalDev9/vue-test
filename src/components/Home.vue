<script setup>
import { ref, onMounted, computed } from "vue";

const isLoading = ref(false);
const subscribers = ref([]);
const totalRecords = ref(0);
const page = ref(1);
const pageSize = ref(10);

function handlePageChange(value) {
  page.value = value;
  fetchData();
}

const pageCount = computed(() => {
  return Math.ceil(totalRecords.value / pageSize.value);
});

const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `http://localhost:8000?page=${page.value}&limit=${pageSize.value}`
    );
    const data = await response.json();
    subscribers.value = data.data || [];
    totalRecords.value = data.total || 0;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <v-container fluid>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="white"
      ></v-progress-circular>
    </v-overlay>
    <v-row justify="center">
      <v-col md="8">
        <v-card class="pa-4">
          <v-row justify="center">
            <v-col md="8">
              <v-card-title class="text-center">Subscribed Users</v-card-title>
            </v-col>
            <v-col md="4">
              <v-btn size="large" to="/subscribe">Add Subscriber</v-btn>
            </v-col>
          </v-row>
          <v-data-table
            :items="subscribers"
            disable-pagination
            :hide-default-footer="true"
          >
          </v-data-table>
          <v-row class="text-center px-4 align-center" wrap>
            <v-col cols="12" md="6">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="totalRecords"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @update:modelValue="handlePageChange"
              >
              </v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-data-table-footer{
  display: none !important;
}
</style>