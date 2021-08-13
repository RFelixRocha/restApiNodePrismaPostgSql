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

app.get('/playlist', async (req, res) => {
  const songs = await prisma.song.findMany({
      where: { released: true },
      include: { singer: true }
  })
  res.json({
      success: true,
      payload: songs,
  })
})

app.get(`/song/:id`, async (req, res) => {
  const { id } = req.params
  const song = await prisma.song.findFirst({
      where: { id: Number(id) },
  })
  res.json({
      success: true,
      payload: song,
  })
})

app.post(`/artist`, async (req, res) => {
  const result = await prisma.artist.create({
      data: { ...req.body },
  })
  res.json({
      success: true,
      payload: result,
  })
})

app.post(`/song`, async (req, res) => {
  const { title, content, singerEmail } = req.body
  const result = await prisma.song.create({
      data: {
          title,
          content,
          released: false,
          singer: { connect: { email: singerEmail } },
      },
  })
  res.json({
      success: true,
      payload: result,
  })
})

app.put('/song/release/:id', async (req, res) => {
  const { id } = req.params
  const song = await prisma.song.update({
      where: { id: Number(id) },
      data: { released: true },
  })
  res.json({
      success: true,
      payload: song,
  })
})

app.delete(`/song/:id`, async (req, res) => {
  const { id } = req.params
  const song = await prisma.song.delete({
      where: { id: Number(id) },
  })
  res.json({
      success: true,
      payload: song,
  })
})

app.get('/artists', async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json({
      success: true,
      payload: artists,
  })
})

app.use((req, res, next) => {
  res.status(404);
  return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint não encontrado para o caminho: ${req.path}`,
  });
});

app.listen(PORT, () => {
  console.log("Rest Api server: "+PORT)
})