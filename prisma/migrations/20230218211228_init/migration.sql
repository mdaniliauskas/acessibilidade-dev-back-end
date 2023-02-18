-- CreateTable
CREATE TABLE "Usuario" (
    "codigo_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "area_conhecimento" TEXT,
    "possui_conhecimento" TEXT,
    "tipo_acesso" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("codigo_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
