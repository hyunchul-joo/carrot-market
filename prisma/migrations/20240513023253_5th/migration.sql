-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vacation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "hanilUserId" INTEGER NOT NULL,
    CONSTRAINT "Vacation_hanilUserId_fkey" FOREIGN KEY ("hanilUserId") REFERENCES "HanilUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vacation" ("createdAt", "date", "hanilUserId", "id") SELECT "createdAt", "date", "hanilUserId", "id" FROM "Vacation";
DROP TABLE "Vacation";
ALTER TABLE "new_Vacation" RENAME TO "Vacation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
