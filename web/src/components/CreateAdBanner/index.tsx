import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export default function CreateAdBanner(){
  return (
    <div className='bg-nlw-gradient mt-8 pt-1 self-stretch rounded-lg'>
      <div className='bg-[#2A2634] px-8 py-6 rounded-b-lg rounded-t flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <label className='text-2xl text-white font-black'>Não encontrou seu duo?</label>
          <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <div className='flex'>
          <Dialog.Trigger className='px-4 py-3 bg-violet-500 hover:bg-violet-600 transition-all text-white rounded flex flex-row items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    </div>
  );
}