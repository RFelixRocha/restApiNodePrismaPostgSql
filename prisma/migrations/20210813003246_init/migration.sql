-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "emai" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "released" BOOLEAN NOT NULL DEFAULT false,
    "singerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist.emai_unique" ON "Artist"("emai");

-- AddForeignKey
ALTER TABLE "Song" ADD FOREIGN KEY ("singerId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
