'use client';

import { SafeRecipe } from '@/types';
import { Book } from 'lucide-react';
import { AiOutlinePlus } from 'react-icons/ai';

type CookbookProps = { recipes?: SafeRecipe[] };

const Cookbook: React.FC<CookbookProps> = ({ recipes }) => {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <Book size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Cookbook</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of Cookbook</div>
    </div>
  );
};

export default Cookbook;
