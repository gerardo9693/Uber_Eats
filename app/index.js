require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const {importSchema} = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const typeDefs = importSchema('./app/schema.graphql');
const { AuthDirective } = require('./resolvers/directives');
const verifyToken = require('./utils/verifyToken');

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const mongo =  mongoose.connection;

mongo.on('error', (error) => console.log(error))
	 .once('open', () => console.log("Connected to database"));

const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
        schemaDirectives: {
            auth:AuthDirective
        }
});

const server = new GraphQLServer({
	schema,
	context: async({request}) => verifyToken(request)
});

const options={
    cors:{
        origin:"*"
    }
}


server.start(options,() => console.log('Servidor corriendo'));

module.exports={options};