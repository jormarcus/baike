'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

import Textarea from './inputs/Textarea';
import { Message } from '@/lib/validators/messageValidator';

const Search = () => {
  const [input, setInput] = useState('');

  const onSearch = async (data: Message) => {
    // TODO - handle loading
    try {
      await axios.post('/api/message', data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div>
      <div className="grow">
        <div className="rounded-full">
          <div className="relative flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();

                  const message: Message = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: input,
                  };

                  onSearch(message);
                }
              }}
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
