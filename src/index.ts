require('dotenv').config();
import { GraphQLServer } from 'graphql-yoga';
import { Server } from 'http';
import { Server as HTTPSServer } from 'https';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

export default (async (): Promise<Server | HTTPSServer> => {
	const server = new GraphQLServer({
		typeDefs,
		resolvers,
	});

	const port = process.env.PORT || 4000;
	return await server.start(
		{
			port,
		},
		() => console.log(`server is running on http://localhost:${port}`)
	);
})();
