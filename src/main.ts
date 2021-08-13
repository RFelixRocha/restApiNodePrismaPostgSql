import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newArtist = await prisma.artist.create({
    data: {
      name: 'Gustavo Lima',
      email: 'gmail@gmail.com',
      songs: {
        create: {
          title: 'Balada boa',
        },
      },
    },
  })
  console.log('Created new artist: ', newArtist)

  const allArtists = await prisma.artist.findMany({
    include: { songs: true },
  })
  console.log('All artists: ')
  console.dir(allArtists, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())