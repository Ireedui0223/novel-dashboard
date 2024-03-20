<template>
  <v-dialog v-model="value" max-width="80vw" overlay-opacity="0.7">
    <v-card v-if="post">
      <v-card-title class="pt-8 pb-4">
        <h3 class="title--large text-center">Нийтлэл засварлах</h3>
        <v-btn
          depressed
          icon
          large
          absolute
          top
          right
          :disabled="loading"
          @click="$emit('onCancel')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-actions width="100%" style="height: 100%">
        <div style="width: 100%">
          <v-form>
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
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="uploadFile($event)"
              class="mb-6"
            />
          </v-form>
          <v-btn
            block
            depressed
            large
            color="primary"
            :loading="loading"
            @click="updatePost()"
          >
            Хадгалах
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { updatePostMutation } from "@/apollo/mutations/post";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    post: {
      type: Object,
      default: {
        id: "",
        title: "",
        text: "",
        link: "",
        image: { id: null },
      },
    },
  },
  data() {
    return {
      loading: false,
    };
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
  methods: {
    async uploadFile(e) {
      this.loading = true;
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
            this.post.image.id = id;
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
      this.loading = false;
    },

    async updatePost() {
      this.loading = true;
      await this.$apollo
        .mutate({
          mutation: updatePostMutation,
          variables: {
            id: this.post.id,
            title: this.post.title,
            text: this.post.text,
            link: this.post.link,
            image_id: this.post.image.id,
          },
        })
        .then(async ({ data }) => {
          const { updatePost } = data;
          const { success, message } = updatePost;
          if (success) {
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "success",
            });
            this.$emit("onConfirm");
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
