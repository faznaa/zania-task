import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
declare global {
    var mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }

let cached = global.mongoose as any;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 50000, // Timeout after 50s
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  position: { type: Number, required: true },
  img: { type: String, required: true },
});

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
