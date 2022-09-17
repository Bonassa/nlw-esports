
import { useEffect, useState, FormEvent } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import api from '../../services/axios';

import { Check, GameController, ArrowElbowRightDown } from 'phosphor-react';
import Input from '../Form/Input';
import ButtonCheck from '../Form/ButtonCheck';

import { GameProps } from '../../App';

export default function AdModal(){
  const [games, setGames] = useState<GameProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [voiceChannel, setVoiceChannel] = useState<boolean>(false);
  const [gameSelected, setGameSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadGames(){
      api.get('games')
      .then((json) => setGames(json.data));
    }

    loadGames();
  }, []);

  async function handleCreateAd(event: FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name) return

    await api.post(`games/${gameSelected}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: voiceChannel
    })
    .then(() => {
      alert('Anúncio criado com sucesso');
    })
    .catch((err) => {
      console.log(err);
      alert('Erro ao cadastrar');
    })
  }

  return(
    <Dialog.Portal> {/**Portal é aonde será exibido o conteúdo do modal */}
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] shadow-lg shadow-black/25 rounded-md'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="game">Qual o game?</label>
            <Select.Root 
              value={gameSelected} 
              onValueChange={(value) => setGameSelected(value)}
            >
              <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm flex flex-row justify-between placeholder:text-zinc-500' >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <ArrowElbowRightDown size={18} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='overflow-hidden rounded bg-zinc-900 text-white' >
                  <Select.Viewport className='px-2 py-1 rounded'>
                    {games.map((game, index) => (
                      <Select.Item value={game.id} key={index} className='py-1 px-2 my-1 cursor-pointer text-sm hover:bg-zinc-800 rounded'>
                        <Select.ItemText>{game.title}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input type="text" name='name' id="name" placeholder='Como te chamam no game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name='yearsPlaying' id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord</label>
              <Input type="text" name='discord' id="discord" placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex flex-row gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type='multiple' 
                className='grid grid-cols-7 gap-1'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ButtonCheck checked={weekDays.includes('0')} value="0" title='Domingo'>D</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('1')} value="1" title='Segunda'>S</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('2')} value="2" title='Terça'>T</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('3')} value="3" title='Quarta'>Q</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('4')} value="4" title='Quinta'>Q</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('5')} value="5" title='Sexta'>S</ButtonCheck>
                <ButtonCheck checked={weekDays.includes('6')} value="6" title='Sábado'>S</ButtonCheck>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2 h-10'>
                <Input name='hourStart' id="hourStart" type="time" placeholder='De' />
                <Input name='hourEnd' id="hourEnd" type="time" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex flex-row gap-2 text-sm items-center cursor-pointer'>
            <Checkbox.Root 
              className='w-6 h-6 rounded bg-zinc-900' 
              checked={voiceChannel} 
              onCheckedChange={(checked) => (checked === true) ? setVoiceChannel(true) : setVoiceChannel(false)}
            >
              <Checkbox.Indicator className='flex justify-center items-center'> {/**Funciona como um span, e o Check dentro é um svg da bib de icons */}
                <Check size={18} className='text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span>Costumo me conectar ao chat de voz</span>
          </label>

          <footer className='mt-4 flex flex-row justify-end gap-4'>
            <Dialog.Close 
              type='button' 
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all duration-[2000]'
            >
              Cancelar
            </Dialog.Close>
            <button 
              className='flex flex-row justify-center items-center gap-2 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 transition-all duration-[2000]' 
              type='submit'>
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}