require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const {importSchema} = require('graphql-import');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const typeDefs = importSchema('./app/schema.graphql');
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true });

const mongo =  mongoose.connection;

mongo.on('error', (error) => console.log(error))
	 .once('open', () => console.log("Connected to database"));


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('Servidor corriendo'));