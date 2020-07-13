import { MaybeDocument } from 'nano';

import couch from './dbConnection/couch';

interface User extends MaybeDocument {
	name: string;
	email: string;
	age: number;
	nice: boolean;
}

interface Update extends MaybeDocument {
	updated: boolean;
	id: string;
	rev: string;
}

export default {
	Mutation: {
		createRecord: async (_parent: any, args: User) => {
			try {
				const record = await (await couch).insert(args);

				console.log(record);
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},

		delete: async (_: any, { id, rev }: { id: string; rev: string }) => {
			const record = await (await couch).destroy(id, rev);
			console.log(record);
			return true;
		},

		update: async (_: any, { id, rev, ...args }: Update) => {
			const findFile = await (await couch).get(id);
			if (findFile) {
				const file = await (await couch).insert({
					_id: id,
					_rev: rev,
					...findFile,
					...args,
				});
				console.log(file);
				return true;
			}
			return false;
		},
	},
	Query: {
		findAll: async () => {
			const files = await (await couch).find({
				selector: {},
				fields: ['name', 'email', 'age', 'nice', 'updated'],
			});
			console.log(files.docs);
			return files.docs;
		},

		findSingle: async (_: any, { id }: { id: string }) => {
			const file = await (await couch).get(id);
			console.log(file);
			return file;
		},
	},
};
