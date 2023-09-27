/*
  Warnings:

  - You are about to drop the column `userMessagesCount` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isUserMessage` on the `Message` table. All the data in the column will be lost.
  - Added the required column `is_user_message` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `prepHours` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prepMinutes` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cookHours` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cookMinutes` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userMessagesCount",
ADD COLUMN     "user_messages_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isUserMessage",
ADD COLUMN     "is_user_message" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "prepHours" SET NOT NULL,
ALTER COLUMN "prepHours" SET DEFAULT 0,
ALTER COLUMN "prepMinutes" SET NOT NULL,
ALTER COLUMN "prepMinutes" SET DEFAULT 0,
ALTER COLUMN "cookHours" SET NOT NULL,
ALTER COLUMN "cookHours" SET DEFAULT 0,
ALTER COLUMN "cookMinutes" SET NOT NULL,
ALTER COLUMN "cookMinutes" SET DEFAULT 0;
