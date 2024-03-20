import gql from "graphql-tag";
import { userModel } from "../models/user";

export const signInMutation = gql`
  mutation login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      success
      message
      token
      user {
        ${userModel}
      }
    }
  }
`;

export const signOutMutation = gql`
  mutation logout {
    logout {
      success
      message
    }
  }
`;
