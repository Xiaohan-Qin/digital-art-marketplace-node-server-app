import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING)
.then(()=>{
  console.log("database connection successful!");
});

const app = express()
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT || 4000);