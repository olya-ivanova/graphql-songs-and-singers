import { gql } from "@apollo/client";

const GET_SONGS = gql`
  {
    songs {
      id
      title
      genre
      releaseYear
      singer {
        name
      }
    }
  }
`;

const GET_SINGERS = gql`
  {
    singers {
      id
      name
    }
  }
`;

const ADD_SONG = gql`
  mutation (
    $title: String!
    $genre: String!
    $releaseYear: Int!
    $singerId: ID!
  ) {
    addSong(
      title: $title
      genre: $genre
      releaseYear: $releaseYear
      singerId: $singerId
    ) {
      id
      title
    }
  }
`;

export { GET_SONGS, GET_SINGERS, ADD_SONG };
