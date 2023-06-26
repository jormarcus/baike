'use client';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';
import { useSearchParams } from 'next/navigation';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const params = useSearchParams();
  console.log('params', params);

  return (
    <div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default SearchPage;
