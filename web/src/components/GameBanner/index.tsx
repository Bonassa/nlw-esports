
interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsAmount: number;
  href?: string;
}

export default function GameBanner(props: GameBannerProps){
  return (
    <a href='#' className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt='Game 1' />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute bottom-0 left-0 right-0'>
        <label className='font-bold text-white'>{props.title}</label>
        <span className='text-zinc-300 text-sm'>{props.adsAmount} anúncio(s)</span>
      </div>
    </a>
  );
}