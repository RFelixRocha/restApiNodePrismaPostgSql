import { PrismaClient } from ".prisma/client";
import express from "express";
const prisma  = new PrismaClient();
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json())

//Aviso de API em funcionamento
app.get('/', (req,res) => {
  return res.status(200).json({
    success: true,
    version:'1.0.0.1',
    message:"Api em funcionamento"
  })
});

//lListagem de playlist
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

//Busca um Song especifico
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

//Cria um novo registro de Artist
app.post(`/artist`, async (req, res) => {
  const result = await prisma.artist.create({
      data: { ...req.body },
  })
  res.json({
      success: true,
      payload: result,
  })
})

//Cria um Song
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

//Habilita uma musica
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

//Deleta uma música
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

// Listas os artistas
app.get('/artists', async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json({
      success: true,
      payload: artists,
  })
})

//Aviso de rota não encontrada
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