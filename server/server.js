const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
