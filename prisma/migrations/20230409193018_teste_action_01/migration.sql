-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "birth_date" DATE,
    "email" TEXT NOT NULL,
    "specialist_area" TEXT,
    "disability" TEXT,
    "access_control" INTEGER NOT NULL DEFAULT 0,
    "completedProfile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");
