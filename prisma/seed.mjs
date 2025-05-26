import { PrismaClient, TipoUso, TipoTransacao, TipoEndereco } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Localidades
  const localidades = await Promise.all(
    [
      { cidade: 'São Paulo', bairro: 'Centro' },
      { cidade: 'Rio de Janeiro', bairro: 'Copacabana' },
      { cidade: 'Belo Horizonte', bairro: 'Savassi' },
      { cidade: 'Curitiba', bairro: 'Batel' },
      { cidade: 'Porto Alegre', bairro: 'Moinhos de Vento' },
      { cidade: 'Florianópolis', bairro: 'Centro' },
      { cidade: 'Brasília', bairro: 'Asa Sul' },
      { cidade: 'Salvador', bairro: 'Barra' },
      { cidade: 'Recife', bairro: 'Boa Viagem' },
      { cidade: 'Fortaleza', bairro: 'Meireles' },
    ].map((loc) => prisma.localidade.create({ data: loc }))
  );

  // Users
  const users = await Promise.all(
    [
      { nome: 'Vagner', sobrenome: 'Silva', hashSenha: 'hash1' },
      { nome: 'Ana', sobrenome: 'Pereira', hashSenha: 'hash2' },
      { nome: 'Lucas', sobrenome: 'Costa', hashSenha: 'hash3' },
      { nome: 'Mariana', sobrenome: 'Alves', hashSenha: 'hash4' },
      { nome: 'Bruno', sobrenome: 'Lima', hashSenha: 'hash5' },
      { nome: 'Carla', sobrenome: 'Souza', hashSenha: 'hash6' },
      { nome: 'Diego', sobrenome: 'Ferreira', hashSenha: 'hash7' },
      { nome: 'Fernanda', sobrenome: 'Ribeiro', hashSenha: 'hash8' },
      { nome: 'Rafael', sobrenome: 'Mendes', hashSenha: 'hash9' },
      { nome: 'Juliana', sobrenome: 'Gomes', hashSenha: 'hash10' },
    ].map((user) => prisma.user.create({ data: user }))
  );

  // Emails
  const emails = await Promise.all(
    users.flatMap((user, i) => [
      prisma.email.create({ data: { email: `user${i + 1}@email.com`, userId: user.id } }),
      prisma.email.create({ data: { email: `contact${i + 1}@email.com`, userId: user.id } }),
    ])
  );

  // Telefones
  const telefones = await Promise.all(
    users.flatMap((user, i) => [
      prisma.telefone.create({ data: { numero: `99999999${i}1`, ddd: 11, userId: user.id } }),
      prisma.telefone.create({ data: { numero: `88888888${i}2`, ddd: 21, userId: user.id } }),
    ])
  );

  // Endereços (pessoal e comercial)
  const enderecos = await Promise.all(
    users.flatMap((user, i) => [
      prisma.endereco.create({
        data: {
          tipo: TipoEndereco.PESSOAL,
          rua: `Rua Pessoal ${i + 1}`,
          numero: `${10 + i}`,
          userId: user.id,
          localidadeId: localidades[i % localidades.length].id,
        },
      }),
      prisma.endereco.create({
        data: {
          tipo: TipoEndereco.COMERCIAL,
          rua: `Rua Comercial ${i + 1}`,
          numero: `${100 + i}`,
          userId: user.id,
          localidadeId: localidades[(i + 1) % localidades.length].id,
        },
      }),
    ])
  );

  // Contas
  const contas = await Promise.all(
    users.flatMap((user, i) => [
      prisma.conta.create({ data: { nome: `Conta Corrente ${i + 1}`, banco: 'Banco A', saldo: 100000, userId: user.id } }),
      prisma.conta.create({ data: { nome: `Conta Poupança ${i + 1}`, banco: 'Banco B', saldo: 500000, userId: user.id } }),
    ])
  );

  // Entradas (receitas financeiras)
  const entradas = await Promise.all(
    contas.map((conta, i) =>
      prisma.entrada.create({
        data: {
          nome: `Salário ${i + 1}`,
          tipo: TipoTransacao.RECORRENTE,
          data: new Date(2025, 4, i + 1),
          valor: 300000 + i * 10000,
          userId: conta.userId,
          contaId: conta.id,
        },
      })
    )
  );

  // Saidas (despesas financeiras)
  const saidas = await Promise.all(
    contas.map((conta, i) =>
      prisma.saida.create({
        data: {
          nome: `Mercado ${i + 1}`,
          tipo: TipoTransacao.VARIAVEL,
          data: new Date(2025, 4, i + 2),
          valor: 50000 + i * 5000,
          userId: conta.userId,
          contaId: conta.id,
        },
      })
    )
  );

  // Unidades
  const unidades = await Promise.all(
    [
      { nome: 'Kilograma', sigla: 'kg' },
      { nome: 'Litro', sigla: 'L' },
      { nome: 'Unidade', sigla: 'un' },
      { nome: 'Pacote', sigla: 'pct' },
      { nome: 'Caixa', sigla: 'cx' },
      { nome: 'Metro', sigla: 'm' },
      { nome: 'Par', sigla: 'par' },
      { nome: 'Grama', sigla: 'g' },
      { nome: 'Mililitro', sigla: 'ml' },
      { nome: 'Centímetro', sigla: 'cm' },
    ].map((u) => prisma.unidade.create({ data: u }))
  );

  // Categorias
  const categorias = await Promise.all(
    [
      { nome: 'Alimentos', descricao: 'Comida e bebidas' },
      { nome: 'Eletrônicos', descricao: 'Aparelhos eletrônicos' },
      { nome: 'Vestuário', descricao: 'Roupas e acessórios' },
      { nome: 'Higiene', descricao: 'Produtos de higiene pessoal' },
      { nome: 'Limpeza', descricao: 'Produtos de limpeza' },
      { nome: 'Móveis', descricao: 'Mobília' },
      { nome: 'Esportes', descricao: 'Equipamentos esportivos' },
      { nome: 'Ferramentas', descricao: 'Ferramentas e equipamentos' },
      { nome: 'Decoração', descricao: 'Itens decorativos' },
      { nome: 'Instrumentos Musicais', descricao: 'Instrumentos para música' },
    ].map((c) => prisma.categoria.create({ data: c }))
  );

  // Lotes
  const lotes = await Promise.all(
    Array(10)
      .fill(null)
      .map((_, i) =>
        prisma.lote.create({
          data: {
            nome: `Lote ${i + 1}`,
            validade: new Date(2025, 11, 31 - i * 10),
            quantidade: 100 + i * 20,
          },
        })
      )
  );

  // Produtos
  const produtos = await Promise.all(
    Array(10)
      .fill(null)
      .map((_, i) =>
        prisma.produto.create({
          data: {
            nome: `Produto ${i + 1}`,
            descricao: `Descrição do produto ${i + 1}`,
            valor: 1000 + i * 500, // centavos
            criadoEm: new Date(),
            uso: i % 2 === 0 ? TipoUso.CONTINUO : TipoUso.DESCARTAVEL,
            fotoUrl: null,
            dataCompra: new Date(2025, 3, i + 1),
            categoriaId: categorias[i % categorias.length].id,
            unidadeId: unidades[i % unidades.length].id,
          },
        })
      )
  );

  // Estoques
  const estoques = await Promise.all(
    users.flatMap((user, i) =>
      Array(2)
        .fill(null)
        .map((_, j) =>
          prisma.estoque.create({
            data: {
              userId: user.id,
              produtoId: produtos[(i * 2 + j) % produtos.length].id,
              loteId: lotes[(i * 2 + j) % lotes.length].id,
              unidadeId: unidades[(i * 2 + j) % unidades.length].id,
              quantidade: 10 + i + j,
            },
          })
        )
    )
  );

  // Listas
  const listas = await Promise.all(
    Array(10)
      .fill(null)
      .map((_, i) =>
        prisma.lista.create({
          data: {
            nome: `Lista ${i + 1}`,
            descricao: `Descrição da lista ${i + 1}`,
            valorTotal: 0,
            finalizada: i % 2 === 0,
            dataCriada: new Date(2025, 4, i + 1),
          },
        })
      )
  );

  // Compras
  const compras = await Promise.all(
    users.flatMap((user, i) =>
      Array(2)
        .fill(null)
        .map((_, j) =>
          prisma.compra.create({
            data: {
              listaId: listas[(i * 2 + j) % listas.length].id,
              produtoId: produtos[(i * 2 + j) % produtos.length].id,
              userId: user.id,
              unidadeId: unidades[(i * 2 + j) % unidades.length].id,
              quantidade: 1 + j,
              dataCompra: new Date(2025, 4, i + j + 1),
            },
          })
        )
    )
  );

  console.log('Seed completa e povoada com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
