/*
  Warnings:

  - Added the required column `koreanName` to the `HanilUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HanilUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "koreanName" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authencated" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_HanilUser" ("authencated", "createdAt", "id", "password", "updatedAt", "username") SELECT "authencated", "createdAt", "id", "password", "updatedAt", "username" FROM "HanilUser";
DROP TABLE "HanilUser";
ALTER TABLE "new_HanilUser" RENAME TO "HanilUser";
CREATE UNIQUE INDEX "HanilUser_username_key" ON "HanilUser"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
