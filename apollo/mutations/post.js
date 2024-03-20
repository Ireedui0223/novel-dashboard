import gql from "graphql-tag";
import { userModel } from "../models/user";

export const updatePostMutation = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String
    $text: String
    $image_id: ID
    $type: postType
    $link: String
  ) {
    updatePost(
      id: $id
      title: $title
      text: $text
      image_id: $image_id
      type: $type
      link: $link
    ) {
      success
      message
    }
  }
`;

export const createPostMutation = gql`
  mutation (
    $title: String!
    $text: String!
    $type: postType
    $image_id: ID
    $link: String
  ) {
    createPost(
      title: $title
      text: $text
      type: $type
      image_id: $image_id
      link: $link
    ) {
      message
      success
    }
  }
`;

export const deletePostMutation = gql`
  mutation ($id: ID!) {
    removePost(id: $id) {
      message
      success
    }
  }
`;
