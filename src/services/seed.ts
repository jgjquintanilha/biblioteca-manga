import { v4 as uuid } from 'uuid'
import type { Manga } from '@/types/manga'

/**
 * Catálogo inicial de mangás.
 * Só é inserido no localStorage se ainda não houver nenhum registro.
 * Ajuste notas, sinopses e anos livremente — é apenas um ponto de partida.
 */
export function gerarSeedMangas(): Manga[] {
  const agora = new Date().toISOString()

  const base: Omit<Manga, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      titulo: 'Sangatsu no Lion',
      autor: 'Chica Umino',
      editora: 'Hakusensha',
      genero: 'Drama',
      status: 'Em andamento',
      ano: 2007,
      volumes: 17,
      nota: 9.4,
      dataAquisicao: '2023-03-14',
      lido: true,
      cepCompra: '01310-100',
      localCompra: 'Av. Paulista, Bela Vista - São Paulo/SP',
      sinopse:
        'Rei Kiriyama é um jovem jogador profissional de shogi que luta contra a depressão e o isolamento após a morte da família. A convivência com as três irmãs Kawamoto traz luz a seus dias.',
      capa: 'https://picsum.photos/seed/sangatsu/300/420'
    },
    {
      titulo: 'Hellsing',
      autor: 'Kouta Hirano',
      editora: 'Shonen Gahosha',
      genero: 'Terror',
      status: 'Completo',
      ano: 1997,
      volumes: 10,
      nota: 9.0,
      dataAquisicao: '2022-08-21',
      lido: true,
      cepCompra: '20031-170',
      localCompra: 'Av. Rio Branco, Centro - Rio de Janeiro/RJ',
      sinopse:
        'A Organização Hellsing caça vampiros e criaturas sobrenaturais na Inglaterra. Alucard, o vampiro mais poderoso já visto, lidera a linha de frente ao lado de sua nova aprendiz Seras Victoria.',
      capa: 'https://picsum.photos/seed/hellsing/300/420'
    },
    {
      titulo: 'Hunter x Hunter',
      autor: 'Yoshihiro Togashi',
      editora: 'Shueisha',
      genero: 'Aventura',
      status: 'Hiato',
      ano: 1998,
      volumes: 37,
      nota: 9.6,
      dataAquisicao: '2021-01-09',
      lido: false,
      cepCompra: '70070-100',
      localCompra: 'Esplanada dos Ministérios - Brasília/DF',
      sinopse:
        'Gon Freecss descobre que seu pai, que ele acreditava morto, é um Hunter lendário. Ele parte em uma jornada para encontrá-lo, fazendo amigos, inimigos e descobrindo o poder do Nen.',
      capa: 'https://picsum.photos/seed/hxh/300/420'
    },
    {
      titulo: 'One-Punch Man',
      autor: 'ONE / Yusuke Murata',
      editora: 'Shueisha',
      genero: 'Ação',
      status: 'Em andamento',
      ano: 2012,
      volumes: 29,
      nota: 9.2,
      dataAquisicao: '2023-06-30',
      lido: false,
      cepCompra: '30130-010',
      localCompra: 'Av. Afonso Pena, Centro - Belo Horizonte/MG',
      sinopse:
        'Saitama é um herói que treinou tanto que ficou forte demais — capaz de derrotar qualquer inimigo com um único soco. O tédio pela falta de desafios é seu maior problema.',
      capa: 'https://picsum.photos/seed/opm/300/420'
    },
    {
      titulo: 'Kaguya-sama: Love Is War',
      autor: 'Aka Akasaka',
      editora: 'Shueisha',
      genero: 'Comédia',
      status: 'Completo',
      ano: 2015,
      volumes: 28,
      nota: 9.1,
      dataAquisicao: '2022-11-12',
      lido: true,
      cepCompra: '80010-010',
      localCompra: 'Rua XV de Novembro, Centro - Curitiba/PR',
      sinopse:
        'Miyuki Shirogane e Kaguya Shinomiya são os gênios do conselho estudantil da Academia Shuchiin. Ambos estão apaixonados, mas nenhum admite — quem confessar primeiro perde.',
      capa: 'https://picsum.photos/seed/kaguya/300/420'
    },
    {
      titulo: 'Spy x Family',
      autor: 'Tatsuya Endo',
      editora: 'Shueisha',
      genero: 'Comédia',
      status: 'Em andamento',
      ano: 2019,
      volumes: 14,
      nota: 9.3,
      dataAquisicao: '2024-02-05',
      lido: false,
      cepCompra: '90010-150',
      localCompra: 'Rua dos Andradas, Centro Histórico - Porto Alegre/RS',
      sinopse:
        'Um espião, uma assassina e uma telepata formam uma família falsa sem saber dos segredos uns dos outros. A missão? Salvar a paz mundial — e talvez virar uma família de verdade.',
      capa: 'https://picsum.photos/seed/spyxfamily/300/420'
    },
    {
      titulo: 'Sword Art Online: Aincrad',
      autor: 'Reki Kawahara',
      editora: 'ASCII Media Works',
      genero: 'Aventura',
      status: 'Completo',
      ano: 2009,
      volumes: 2,
      nota: 8.5,
      dataAquisicao: '2023-09-18',
      lido: true,
      cepCompra: '88010-400',
      localCompra: 'Av. Beira Mar Norte - Florianópolis/SC',
      sinopse:
        'Kirito fica preso em um MMORPG de realidade virtual onde morrer no jogo significa morrer de verdade. Para escapar, ele precisa chegar ao andar 100 do castelo flutuante de Aincrad.',
      capa: 'https://picsum.photos/seed/saoaincrad/300/420'
    },
    {
      titulo: 'Sword Art Online: Fairy Dance',
      autor: 'Reki Kawahara',
      editora: 'ASCII Media Works',
      genero: 'Aventura',
      status: 'Completo',
      ano: 2009,
      volumes: 2,
      nota: 8.0,
      dataAquisicao: '2023-09-18',
      lido: false,
      cepCompra: '88010-400',
      localCompra: 'Av. Beira Mar Norte - Florianópolis/SC',
      sinopse:
        'Após os eventos de Aincrad, Kirito mergulha em ALfheim Online para resgatar Asuna, mantida em cativeiro por Sugou Nobuyuki. Uma nova aventura entre fadas e magia começa.',
      capa: 'https://picsum.photos/seed/saofairy/300/420'
    }
  ]

  return base.map((m) => ({
    id: uuid(),
    ...m,
    createdAt: agora,
    updatedAt: agora
  }))
}