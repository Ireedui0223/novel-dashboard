<template>
  <div style="height: 100vh">
    <v-img
      :src="require('@/assets/images/bg-3.jpg')"
      height="100%"
      width="100%"
    >
      <v-row
        align-content="center"
        justify="center"
        align="center"
        style="height: 100%"
        no-gutters
        dense
      >
        <v-col cols="6">
          <v-img
            :src="require('@/assets/images/logo/background.jpg')"
            :lazy-src="require('@/assets/images/logo/background.jpg')"
            alt="novel-investment-logo"
            class="ma-16"
          />
        </v-col>
        <v-col cols="6" style="height: 100%">
          <div class="d-flex flex-column justify-center" style="height: 100%">
            <div class="white pa-16 rounded-lg">
              <h2 class="mb-6 font-weight-bold justify-center">Нэвтрэх</h2>
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model.trim="email"
                    outlined
                    autofocus
                    clearable
                    clear-icon="mdi-close"
                    label="Email"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    v-model.trim="password"
                    outlined
                    label="Password"
                    :type="show_password ? 'text' : 'password'"
                    :rules="[(v) => !!v || 'Required']"
                    :append-icon="
                      show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    @click:append="show_password = !show_password"
                    @keypress.enter="login(email, password)"
                  />
                </v-form>
                <v-btn
                  block
                  large
                  depressed
                  color="primary"
                  :loading="loading"
                  :disabled="!valid"
                  @click="login(email, password)"
                >
                  Нэвтрэх
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
import { signInMutation } from "@/apollo/mutations/user";
import Snackbar from "@/components/Snackbar.vue";
export default {
  layout: "blank",
  middleware({ store, redirect }) {
    if (store.state.user) redirect("/");
  },
  components: {
    Snackbar,
  },
  data() {
    return {
      valid: false,
      show_password: false,
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    async login(email, password) {
      this.loading = true;
      await this.$apollo
        .mutate({
          mutation: signInMutation,
          variables: {
            email,
            password,
          },
        })
        .then(async ({ data }) => {
          const { login } = data;
          const { message, success, token, user } = login;
          this.loading = false;
          if (success && token) {
            await this.$apolloHelpers.onLogin(token);
            this.$cookiz.set("token", token);
            this.$store.commit("setUser", user);
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "success",
            });
            this.$router.push("/");
          } else {
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "error",
            });
            this.$cookiz.remove("token");
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.loading = false;
          this.$store.commit("setSnackbar", {
            value: true,
            message: "Алдаа гарлаа",
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
