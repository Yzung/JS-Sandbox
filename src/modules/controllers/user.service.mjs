import prisma from '../../../prisma/client.mjs';

export async function getAllUsers() {
  return await prisma.user.findMany()
}

export async function createUser(data) {
  return await prisma.user.create({
    data: {
      nome: data.nome,
      sobrenome: data.sobrenome,
      hashSenha: data.hashSenha
    }
  })
}
