import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';

// MongoDB connection options optimized for serverless
// Note: MongoDB Atlas connection strings already include SSL/TLS parameters
// We don't need to explicitly set TLS options as they're handled by the connection string
const options: any = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // Retry options (these are usually in the connection string, but set here for safety)
  retryWrites: true,
  retryReads: true,
  // Compression
  compressors: ['zlib'],
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
    
    // Test the connection with a ping
    try {
      await client.db('admin').command({ ping: 1 });
    } catch (pingError) {
      console.error('MongoDB ping failed:', pingError);
      // Continue anyway, as ping might fail but connection might still work
    }
    
    return client.db('sallestial');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();
      if (errorMsg.includes('ssl') || errorMsg.includes('tls') || errorMsg.includes('tlsv1')) {
        throw new Error(`MongoDB SSL/TLS error: Please verify your MONGODB_URI connection string format. It should be: mongodb+srv://username:password@cluster.mongodb.net/sallestial?retryWrites=true&w=majority. Also check MongoDB Atlas network access settings.`);
      }
      if (errorMsg.includes('authentication') || errorMsg.includes('auth')) {
        throw new Error(`MongoDB authentication error: Please check your username and password in MONGODB_URI`);
      }
      if (errorMsg.includes('timeout')) {
        throw new Error(`MongoDB connection timeout: Please check your network connection and MongoDB Atlas network access settings (allow 0.0.0.0/0 for all IPs)`);
      }
      if (errorMsg.includes('dns') || errorMsg.includes('enotfound')) {
        throw new Error(`MongoDB DNS error: Please check your cluster hostname in MONGODB_URI`);
      }
    }
    
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

