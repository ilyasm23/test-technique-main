-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "executionDate" DATETIME
);
CREATE UNIQUE INDEX "Todo_id_key" ON "Todo"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
