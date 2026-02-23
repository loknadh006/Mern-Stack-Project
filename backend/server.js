import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productroutes from './routes/products.routes.js';
import authRoutes from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = 5000;

/* ✅ ALLOW ALL ORIGINS (DEV MODE) */
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Backend server running');
});

app.use('/api/products', productroutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log('server started at http://localhost:' + PORT);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
};

start();
