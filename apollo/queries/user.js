import gql from "graphql-tag";
import { userModel } from "../models/user";

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    getCurrentUser {
      success
      message
      user {
        ${userModel}
      }
    }
  }
`;
