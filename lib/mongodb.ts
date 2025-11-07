import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';

// MongoDB connection options optimized for serverless
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
};

// Use a global variable to store the MongoClient promise
// This is important for serverless environments like Vercel
// where the module may be executed multiple times but we want to reuse connections
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

// Only initialize MongoDB connection if URI is provided
if (uri) {
  // In serverless environments, we need to use a global variable
  // to prevent creating multiple connections during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function getDatabase(): Promise<Db> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Please add it to your environment variables.');
  }
  
  if (!clientPromise) {
    throw new Error('MongoDB client is not initialized. Please check your MONGODB_URI configuration.');
  }
  
  try {
    // Add timeout to prevent hanging
    const client = await Promise.race([
      clientPromise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000)
      )
    ]);
    
    return client.db('sallestial');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

