
import express from 'express'; // Importando o express no modelo ECMAScript
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();  // instanciando o express

app.use(express.json()); // Habilitando o express para retornar JSON
app.use(cors()) // Sem passar parâmetros, permitimos que qualquer front-end acesse

// instanciando o prisma e criando a conexão com o banco de dados
const prisma = new PrismaClient({
  log: ['query']  // Propriedade para printar no console os logs de querys
});

// Quando criar uma rota não usar verbo (/list-games)
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  return response.json(games);
});

// Podemos ter duas rotas /ads se forem de métodos HTTP diferentes (localhost:3333/ads)
app.post('/games/:gameId/ads', async (request, response) => {
  const gameId = request.params.gameId;
  const body = request.body;

  // Falta fazer a validação (Biblioteca ZOD Javascript)

  const saveAd = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(saveAd);
});

// Criando uma rota para retornar os ads de um game específico
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    where: {
      gameId: gameId,
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }));
});

// Criando uma rota para retornar o Discord
app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const discord = await prisma.ad.findUnique({
    where: {
      id: adId
    },
    select: {
      discord: true,
    }
  })

  return response.json(discord);
});

// Rodando a aplicação em localhost na porta 3333
app.listen(3333);