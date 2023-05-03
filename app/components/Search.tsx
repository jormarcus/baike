'use client';

import { useState } from 'react';
import Textarea from './inputs/Textarea';

const Search = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <div className="grow">
        <div className="rounded-full">
          <div className="relative flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              placeholder="Find your next recipe..."
              className="h-14 outline-none focus:outline-none w-full font-medium duration-200 transition-all focus:ring-1 resize-none overflow-hidden border-gray-400 shadow-sm rounded-t-[32px] rounded-b-[32px] py-4 px-6 pr-[128px] md:pr-[138px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
