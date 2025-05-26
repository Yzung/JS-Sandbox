-- CreateEnum
CREATE TYPE "TipoUso" AS ENUM ('CONTINUO', 'DESCARTAVEL');

-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('RECORRENTE', 'VARIAVEL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "hashSenha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "ddd" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localidade" (
    "id" SERIAL NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "Localidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EPessoal" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "localidadeId" INTEGER NOT NULL,

    CONSTRAINT "EPessoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EComercial" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "localidadeId" INTEGER NOT NULL,

    CONSTRAINT "EComercial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "saldo" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrada" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoTransacao" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "Entrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saida" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoTransacao" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "Saida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataTentativa" TIMESTAMP(3) NOT NULL,
    "nota" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL,
    "uso" "TipoUso" NOT NULL,
    "fotoUrl" TEXT,
    "dataCompra" TIMESTAMP(3),
    "categoriaId" INTEGER NOT NULL,
    "loteId" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valorTotal" INTEGER NOT NULL,
    "finalizada" BOOLEAN NOT NULL,
    "dataCriada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "listaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "dataCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_userId_key" ON "Email"("email", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Telefone_numero_userId_key" ON "Telefone"("numero", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "EPessoal_rua_numero_localidadeId_userId_key" ON "EPessoal"("rua", "numero", "localidadeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "EComercial_rua_numero_localidadeId_userId_key" ON "EComercial"("rua", "numero", "localidadeId", "userId");

-- CreateIndex
CREATE INDEX "Conta_userId_idx" ON "Conta"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Entrada_nome_userId_key" ON "Entrada"("nome", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Saida_nome_userId_key" ON "Saida"("nome", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Receita_nome_key" ON "Receita"("nome");

-- CreateIndex
CREATE INDEX "Estoque_userId_idx" ON "Estoque"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Compra_listaId_produtoId_userId_key" ON "Compra"("listaId", "produtoId", "userId");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPessoal" ADD CONSTRAINT "EPessoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPessoal" ADD CONSTRAINT "EPessoal_localidadeId_fkey" FOREIGN KEY ("localidadeId") REFERENCES "Localidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EComercial" ADD CONSTRAINT "EComercial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EComercial" ADD CONSTRAINT "EComercial_localidadeId_fkey" FOREIGN KEY ("localidadeId") REFERENCES "Localidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saida" ADD CONSTRAINT "Saida_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saida" ADD CONSTRAINT "Saida_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "Lista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
