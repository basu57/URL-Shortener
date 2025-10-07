import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { shortUrl, getOriginalUrl } from "./Controllers/url.js";
dotenv.config();
const app = express();

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(
  process.env.URI 
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));


  // rendering the ejs file
  app.get('/',(req,res)=>{
    res.render("index.ejs", {shortUrl :null})
  })

  // shorting url logic
  app.post('/short',shortUrl)

  // redirect to original url using short code :- dynamic routing
  app.get("/:shortCode", getOriginalUrl);

const port = process.env.PORT || 1000;
app.listen(port,()=>console.log(`server is running on port ${port}`))
