import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_SINGERS, ADD_SONG } from "../queries/queries";

const AddSong = () => {
  const {
    loading: loadingSingers,
    error: errorGettingSingers,
    data: singersData,
  } = useQuery(GET_SINGERS);

  const [addNewSong, { loading: loadingSubmit, error: errorSubmit }] =
    useMutation(ADD_SONG, {
      update(cache, { data: { addSong } }) {
        cache.modify({
          fields: {
            songs(existingSongs = []) {
              const newSongRef = cache.writeFragment({
                data: addSong,
                fragment: gql`
                  fragment Song on SongType {
                    id
                    title
                  }
                `,
              });
              return [...existingSongs, newSongRef];
            },
          },
        });
      },
    });

  let title;
  let genre;
  let releaseYear;
  let singerId;

  if (loadingSingers) {
    return <p>Loading...</p>;
  }

  if (loadingSubmit) {
    return "Submitting...";
  }

  if (errorGettingSingers) {
    return <p>Error : {errorGettingSingers.message}</p>;
  }

  if (errorSubmit) {
    return `Submission error! ${errorSubmit.message}`;
  }

  const handleCreateNewSong = (event) => {
    event.preventDefault();
    addNewSong({
      variables: {
        title: title.value,
        genre: genre.value,
        releaseYear: Number(releaseYear.value),
        singerId: singerId.value,
      },
    });
  };

  return (
    <form onSubmit={handleCreateNewSong}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        ref={(node) => {
          title = node;
        }}
      />
      <label htmlFor="genre">Genre</label>
      <input
        id="genre"
        ref={(node) => {
          genre = node;
        }}
      />
      <label htmlFor="release">Release</label>
      <input
        id="release"
        ref={(node) => {
          releaseYear = node;
        }}
      />
      <label htmlFor="singer">Singer</label>
      <select
        ref={(node) => {
          singerId = node;
        }}
      >
        {singersData.singers.map((singer) => {
          const { id, name } = singer;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSong;
