-- CreateTable
CREATE TABLE "HanilUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authencated" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hanilUserId" INTEGER NOT NULL,
    CONSTRAINT "Vacation_hanilUserId_fkey" FOREIGN KEY ("hanilUserId") REFERENCES "HanilUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HanilUser_username_key" ON "HanilUser"("username");
