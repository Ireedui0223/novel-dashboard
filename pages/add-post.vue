<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="title--medium"> Мэдээ нийтлэх </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="post.title"
            label="Гарчиг"
            outlined
            dense
            :rules="[(v) => !!v || 'Гарчиг оруулна уу']"
          />
          <v-textarea
            v-model="post.text"
            label="Мэдээлэл"
            outlined
            dense
            scrollable
            :rules="[(v) => !!v || 'Мэдээлэл оруулна уу']"
          />
          <v-text-field
            v-model="post.link"
            label="Нэмэлт холбоос"
            outlined
            dense
          />
          <div v-if="fileLoading" class="d-flex justify-center">
            <v-progress-circular
              color="primary"
              mandatory
              indeterminate
            ></v-progress-circular>
          </div>
          <div v-else class="mb-6">
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="uploadFile($event)"
            />
          </div>
          <v-select
            v-model="post.type"
            :items="post_types"
            :rules="[(v) => !!v || 'Төрөл оруулна уу']"
            label="Төрөл сонгох"
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          depressed
          large
          color="primary"
          :loading="loading"
          @click="addPost()"
          :disabled="!valid || post == null || post.image == null"
        >
          Нэмэх
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createPostMutation } from "@/apollo/mutations/post";
export default {
  data() {
    return {
      post: {
        title: "",
        text: "",
        link: "",
        image: null,
        type: null,
      },
      valid: false,
      loading: false,
      fileLoading: false,
      post_types: ["information", "interesting", "special"],
    };
  },
  methods: {
    async uploadFile(e) {
      const authorization = this.$cookiz.get("token");
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("type", "post");

      await this.$axios({
        method: "post",
        url: "http://localhost:8080/upload",
        data: formData,
        headers: {
          authorization,
        },
      })
        .then(async ({ data: { success, message, id } }) => {
          this.fileLoading = false;
          if (!success)
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "error",
            });
          else {
            this.post.image = id;
          }
        })
        .catch((err) => {
          this.fileLoading = false;
          this.$store.commit("setSnackbar", {
            value: true,
            message: "Алдаа гарлаа. Системийн админтай холбогдоно уу.",
            type: "error",
          });
        });
    },
    async addPost() {
      this.loading = true;
      await this.$apollo
        .mutate({
          mutation: createPostMutation,
          variables: {
            image_id: this.post.image,
            title: this.post.title,
            text: this.post.text,
            link: this.post.link,
            type: this.post.type,
          },
        })
        .then(async ({ data }) => {
          const { createPost } = data;
          const { success, message } = createPost;
          if (success) {
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "success",
            });
            this.post = {
              title: "",
              text: "",
              link: "",
              image: null,
              type: null,
            };
          } else {
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "error",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$store.commit("setSnackbar", {
            value: true,
            message: err.message,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
