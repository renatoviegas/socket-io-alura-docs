import { MongoClient } from "mongodb";

let documentsCollection;

async function connectDatabase({ dbUser, dbPass, dbPath, dbName }) {
  const client = new MongoClient(`mongodb+srv://${dbUser}:${dbPass}@${dbPath}/?retryWrites=true&w=majority`);

  try {
    await client.connect();
    console.log('Database connected with successful');

    const db = client.db(dbName);

    documentsCollection = db.collection('games');
  } catch (error) {
    console.log(error);
  }
}

export { connectDatabase, documentsCollection };