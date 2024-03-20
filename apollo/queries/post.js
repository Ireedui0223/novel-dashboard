import gql from "graphql-tag";
import { postModel } from "../models/post";
export const postsQuery = gql`
  query get_posts($type: postType) {
    getPosts(type: $type) {
      success
      message
      count
      posts {
        ${postModel}
      }
    }
  }
`;

export const postQuery = gql`
  query get_post($id: ID!) {
    getPost(id: $id) {
      success
      message
      post {
        ${postModel}
      }
    }
  }
`;
