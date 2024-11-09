import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import {getApiHealth} from './controllers/health.js'
import { postApiV1Transaction, postApiV2Transaction, getApiTransaction, getApiTransactionByUserId, deleteApiTransactionById, putApiTransactionsById ,getApiv1Transaction} from "./controllers/transaction.js";
import { postApiSignups, getApiSignups, postApiLogins, } from "./controllers/user.js";

//hosting on on-render
import path from 'path';
const __dirname = path.resolve();


const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  if (connection) {
    console.log("MongoBD Connected Successfully");
  }
};
connection();

//post API - /api/signups
app.post('/api/v1/signups', postApiSignups);
//get API - /api/signups/:id
app.get('/api/v1/signups/:id', getApiSignups);

//post API - /api/logins
app.post("/api/v1/logins", postApiLogins);

app.post("/api/v1/transactions",postApiV1Transaction);//post API - /api/v1/transactions
app.post("/api/v2/transactions",postApiV2Transaction); //post API - /api/v1/transactions

//get - /api/transactions
app.get("/api/v1/transactions",getApiTransaction);
app.get("/api/v1/transaction/user/:id", getApiTransactionByUserId);
app.get("/api/v1/transactions/:id", getApiv1Transaction);


//delete - /api/trasactions
app.delete("/api/v1/transactions/:id", deleteApiTransactionById);

//put - /api/trasactions/:id
app.put("/api/v1/transactions/:id", putApiTransactionsById);

//health api for testing
app.get("/api/v1/health", getApiHealth);

if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')) }); }

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
