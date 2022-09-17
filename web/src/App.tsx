
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import logoNlw from './assets/logo-nlw-esports.svg';

import api from './services/axios';

import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import AdModal from './components/AdModal';

export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export default function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    async function loadGames(){
      api.get('games')
      .then((response) => setGames(response.data));
    }

    loadGames();
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src={logoNlw} alt='Logo NLW' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => (
          <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsAmount={game._count.ads} />
        ))}
      </div>

      <Dialog.Root> {/**Colocando o Dialog.root envolta daonde será chamado o modal */}
        <CreateAdBanner /> {/**Dentro do CreateAd foi colocado o Dialog.trigger para chamar o modal */}

        <AdModal />
      </Dialog.Root>
    </div>
  );
}