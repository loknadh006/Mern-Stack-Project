import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const email = 'copilot_smoke_test@example.com';

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'products' });
    const deleted = await User.findOneAndDelete({ email });
    if (deleted) {
      console.log('Deleted user:', deleted.email);
    } else {
      console.log('User not found:', email);
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error deleting user:', err.message || err);
    process.exit(1);
  }
}

run();
