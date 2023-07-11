import { useQuery } from "@apollo/client";
import { GET_SONGS } from "../queries/queries";

const Songs = () => {
  const { loading, error, data } = useQuery(GET_SONGS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <div>
      <h2>List Of Songs:</h2>
      {data.songs.map((song) => {
        const { id, title, genre, releaseYear, singer } = song;

        return (
          <div key={id}>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <p>Was released in {releaseYear} year</p>
            <p>Singer: {singer.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
