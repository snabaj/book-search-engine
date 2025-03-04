import { gql } from '@apollo/client';

// GET_ME runs the 'me' query that returns the logged in user's details.
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;