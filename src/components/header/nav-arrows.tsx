import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavArrows = () => {
  const router = useRouter();
  const isHomePage = usePathname() === '/';

  return (
    <>
      <Button
        onClick={() => router.back()}
        className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
        disabled={isHomePage}
      >
        <ChevronLeft className="text-white" size={35} />
      </Button>
      <Button
        onClick={() => router.forward()}
        className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
      >
        <ChevronRight className="text-white" size={35} />
      </Button>
    </>
  );
};

export default NavArrows;
