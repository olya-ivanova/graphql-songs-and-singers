const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const songs = [
  {
    id: "1",
    title: "Billie Jean",
    genre: "Post-disco R&B funk dance-pop",
    releaseYear: 1982,
    singerId: "11",
  },
  {
    id: "2",
    title: "One More Chance",
    genre: "Pop",
    releaseYear: 1995,
    singerId: "22",
  },
  {
    id: "3",
    title: "This Used to Be My Playground",
    genre: "Pop",
    releaseYear: 1992,
    singerId: "22",
  },
];

const singers = [
  {
    id: "11",
    name: "Michael Jackson",
  },
  {
    id: "22",
    name: "Madonna",
  },
];

const SongType = new GraphQLObjectType({
  name: "Song",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    releaseYear: { type: GraphQLInt },
    singer: {
      type: SingerType,
      resolve(parent, args) {
        return singers.find((singer) => singer.id === parent.singerId);
      },
    },
  }),
});

const SingerType = new GraphQLObjectType({
  name: "Singer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return songs.filter((song) => song.singerId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return songs;
      },
    },
    singers: {
      type: new GraphQLList(SingerType),
      resolve() {
        return singers;
      },
    },
    song: {
      type: SongType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return songs.find((song) => song.id === args.id);
      },
    },
    singer: {
      type: SingerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return singers.find((singer) => singer.id === args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSinger: {
      type: SingerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const newSinger = {
          id: songs.length,
          name: args.name,
        };
        singers.push(newSinger);

        return newSinger;
      },
    },
    addSong: {
      type: SongType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        releaseYear: { type: new GraphQLNonNull(GraphQLInt) },
        singerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const newSong = {
          id: songs.length + 1,
          title: args.title,
          genre: args.genre,
          releaseYear: args.releaseYear,
          singerId: args.singerId,
        };
        songs.push(newSong);

        return newSong;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
