import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';

const MobileButtons = () => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push('/')}
        className="rounded-full p-3 bg-white text-foreground flex items-center justify-center cursor-pointer hover:opacity-75 transition"
      >
        <HiHome className="text-black" size={20} />
      </Button>
      <Button
        onClick={() => router.push('/search')}
        className="rounded-full p-3 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
      >
        <BiSearch className="text-black" size={20} />
      </Button>
    </>
  );
};

export default MobileButtons;
