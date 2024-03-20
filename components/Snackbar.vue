<template>
  <v-snackbar
    v-model="$store.state.snackbar.value"
    :color="$store.state.snackbar.type"
    tile
    fixed
    top
    centered
    elevation="0"
  >
    <div class="d-flex flex-row">
      <v-icon class="mr-4">{{ icon($store.state.snackbar.type) }}</v-icon>
      <span
        style="white-space: pre-line"
        v-html="$store.state.snackbar.message"
      />
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        v-bind="attrs"
        @click="
          $store.commit('setSnackbar', {
            value: false,
            message: null,
            type: null,
          })
        "
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar?.value;
    },
  },
  watch: {
    snackbar(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.$store.commit("setSnackbar", {
            value: false,
            message: null,
            type: null,
          });
        }, 5000);
      }
    },
  },
  methods: {
    icon(type) {
      switch (type) {
        case "success":
          return "mdi-check-circle";
        case "error":
          return "mdi-alert";
        case "warning":
          return "mdi-alert-octagram";
        case "info":
          return "mdi-information-outline";
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>./Snackbar.vue
