-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('PATH', 'ACTION', 'DESTINATION');

-- CreateTable
CREATE TABLE "BoardTile" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "cardId" TEXT,

    CONSTRAINT "BoardTile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "type" "CardType" NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
