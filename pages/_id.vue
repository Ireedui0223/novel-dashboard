<template>
  <div v-if="post" class="mx-60">
    <v-img
      alt="news"
      :src="post.image?.url"
      :lazy-src="post.image?.url"
      centered
      contain
      max-height="50vh"
    />
    <v-card-title class="title--medium px-0">
      {{ post.title }}
    </v-card-title>
    <v-card-text class="body--medium px-0">
      <div v-html="post.text" />
    </v-card-text>
    <a v-if="post.link" :href="post.link" target="_blank"> Үргэлжүүлж үзэх </a>
  </div>
</template>

<script>
import { postQuery } from "@/apollo/queries/post";

export default {
  apollo: {
    post: {
      query: postQuery,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update({ getPost }) {
        const { success, post } = getPost;
        if (success) {
          return post;
        }
        return [];
      },
      error(err) {
        console.error("postsQuery", err);
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
