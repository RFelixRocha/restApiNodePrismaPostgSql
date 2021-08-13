import { PrismaClient } from ".prisma/client";
import express from "express";
const prisma  = new PrismaClient();
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json())

app.get('/', (req,res) => {
  return res.status(200).json({
    success: true,
    version:'1.0.0.1',
    message:"Api em funcionamento"
  })
});

app.listen(PORT, () => {
  console.log("Rest Api server: "+PORT)
})