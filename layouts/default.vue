<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar color="primary" size="48">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>
        <span class="ml-2">{{ $store.state.user?.email }}</span>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-post</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Нийтлэлүүд</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="add-post">
          <v-list-item-icon>
            <v-icon>mdi-star-shooting-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Нийтлэл нэмэх</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="0" outlined flat>
      <v-spacer />
      <nuxt-link to="/">
        <img
          :src="require(`@/assets/images/logo/logo.png`)"
          height="64"
          alt="logo"
        />
      </nuxt-link>
    </v-app-bar>

    <v-main app>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app outlined class="justify-end">
      <div class="caption px-2 d-flex flex-row align-center justify-end">
        <div>
          Novel Investment {{ new Date().getFullYear() }} &copy; Зохиогчийн эрх
          хуулиар хамгаалагдсан
        </div>
      </div>
    </v-footer>
    <Snackbar />
  </v-app>
</template>

<script>
import { getCurrentUserQuery } from "@/apollo/queries/user";
import Snackbar from "@/components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  middleware: ["isAuth"],
  apollo: {
    getCurrentUser: {
      skip() {
        const cookie = this.$cookiz.get("token");
        return !cookie;
      },
      query: getCurrentUserQuery,
      result({
        data: {
          getCurrentUser: { success, message, user },
        },
      }) {
        if (success) this.$store.commit("setUser", user);
        else this.$store.commit("setUser", null);
      },
      error(err) {
        console.error("get current user", err);
        this.$store.commit("setSnackbar", {
          value: true,
          message: err,
          type: "error",
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
