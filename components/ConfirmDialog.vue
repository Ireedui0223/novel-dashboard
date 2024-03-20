<template>
    <v-dialog v-model="value" max-width="420" overlay-opacity="0.7">
      <v-card>
        <v-card-text class="pt-4 d-flex flex-column justify-center align-center">
          <v-icon size="80" color="primary" class="mb-2">ph-question</v-icon>
          <h3 class="title--medium text-center">{{ title }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-row dense class="ma-0">
            <v-col cols="6" @click="$emit('onCancel')">
              <v-btn block depressed outlined large :disabled="loading">
                Болих
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                depressed
                large
                color="primary"
                :loading="loading"
                @click="$emit('onConfirm')"
              >
                {{ text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "Тийм",
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      value: {
        get: function () {
          return this.dialog;
        },
        set: function (value) {
          this.$emit("onUpdate", value);
        },
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  