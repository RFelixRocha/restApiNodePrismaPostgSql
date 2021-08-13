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

app.get('/artists', async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json({
    success: true,
    payload: artists,
    message: "Operation Successful",
  })
})

app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
  });

app.listen(PORT, () => {
  console.log("Rest Api server: "+PORT)
})