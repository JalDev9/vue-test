<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  email: "",
  name: "",
  lastName: "",
  status: false,
});

async function submit() {
  if (form.value.email === "") {
    return;
  }

  form.value.status = form.value.status === 1;
  
  try {
    const response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else{
      const data = await response.json();
      alert(data.message);
    }

  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

const rules = {
  required: (value: any) => !!value || "Required.",
  email: (value: any) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
};
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4">
        <v-card class="pa-4">
          <v-card-title class="text-center">Subscribe Form</v-card-title>
          <v-card-item>
            <v-form @submit.prevent="submit">
              <v-text-field
                prepend-inner-icon="mdi-email"
                :rules="[rules.required, rules.email]"
                v-model="form.email"
                label="Email"
              ></v-text-field>

              <v-text-field
                :rules="[rules.required]"
                prepend-inner-icon="mdi-key"
                v-model="form.name"
                label="Name"
              ></v-text-field>

              <v-text-field
                :rules="[rules.required]"
                prepend-inner-icon="mdi-key"
                v-model="form.lastName"
                label="Last Name"
              ></v-text-field>

              <v-radio-group label="Active?" v-model="form.status">
                <v-radio name="status" label="False" :value="0"></v-radio>
                <v-radio name="status" label="True" :value="1"></v-radio>
              </v-radio-group>

              <v-btn
                color="red-darken-1"
                variant="elevated"
                type="submit"
                block
                class="mt-2"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
