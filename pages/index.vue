<template>
  <div>
    <v-select
      v-model="chosen_type"
      :items="post_types"
      label="Төрөл сонгох"
      outlined
    ></v-select>
    <div v-if="posts">
      <v-data-table :headers="headers" :items="posts || []" class="elevation-1">
        <template v-slot:item.image="{ item }">
          <v-img width="80" :src="item.image?.url"></v-img>
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:item.text="{ item }">
          <p class="line-clamp-3 body--medium">
            {{ item.text }}
          </p>
        </template>
        <template v-slot:item.link="{ item }">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            <p class="line-clamp-3 body--medium">
              {{ item.link }}
            </p>
          </a>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteDialog(item)"> mdi-close </v-icon>
          </div>
        </template>
      </v-data-table>
    </div>
    <UpdateDialog
      v-if="editingItem"
      :dialog.sync="update_dialog"
      :post="editingItem"
      @onUpdate="(update_dialog = $event), (editingItem = null)"
      @onCancel="(update_dialog = false), (editingItem = null)"
      @onConfirm="updatePost()"
    />
    <ConfirmDialog
      v-if="editingItem"
      :dialog.sync="delete_dialog"
      :title="`Та ${
        editingItem.title || 'энэ'
      } нийтлэлийг устгахдаа итгэлтэй байна уу?`"
      :text="'Устгах'"
      :loading="delete_loading"
      @onUpdate="delete_dialog = $event"
      @onCancel="delete_dialog = false"
      @onConfirm="deletePost()"
    />
  </div>
</template>

<script>
import { postsQuery } from "@/apollo/queries/post";
import { deletePostMutation } from "@/apollo/mutations/post";
import UpdateDialog from "@/components/UpdateDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
    UpdateDialog,
  },
  apollo: {
    posts: {
      query: postsQuery,
      variables() {
        return {
          type: this.chosen_type,
        };
      },
      update({ getPosts }) {
        const { success, posts } = getPosts;
        if (success) {
          return posts;
        }
        return [];
      },
      error(err) {
        console.error("postsQuery", err);
        return [];
      },
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Гарчиг",
          align: "start",
          sortable: true,
          value: "title",
        },
        { text: "Зураг", value: "image" },
        { text: "Төрөл", value: "type" },
        { text: "Мэдээлэл", value: "text" },
        { text: "Нэмэлт холбоос", value: "link" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      update_dialog: false,
      delete_dialog: false,
      delete_loading: false,
      editingItem: null,
      post_types: ["information", "interesting", "special"],
      chosen_type: "information",
    };
  },
  methods: {
    updatePost() {
      this.update_dialog = false;
      this.editingItem = null;
      this.$apollo.queries.posts.refetch();
    },
    editItem(item) {
      this.editingItem = item;
      this.update_dialog = true;
    },
    openDeleteDialog(item) {
      this.editingItem = item;
      this.delete_dialog = true;
    },
    async deletePost() {
      this.delete_loading = true;
      await this.$apollo
        .mutate({
          mutation: deletePostMutation,
          variables: {
            id: this.editingItem.id,
          },
        })
        .then(async ({ data }) => {
          const { removePost } = data;
          const { success, message } = removePost;
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
            this.$apollo.queries.posts.refetch();
          } else {
            this.$store.commit("setSnackbar", {
              value: true,
              message,
              type: "error",
            });
          }
          this.delete_dialog = false;
          this.delete_loading = false;
        })
        .catch((err) => {
          this.delete_loading = false;
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
