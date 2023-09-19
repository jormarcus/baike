'use client';

import qs from 'query-string';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '../inputs/Input';
import { useDebounce } from '@/hooks/useDebounce';
interface SearchboxProps {
  handleSearch?: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const Searchbox: React.FC<SearchboxProps> = ({
  handleSearch,
  placeholder,
  debounceTime = 500,
}) => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const debouncedQuery = useDebounce<string>(query, debounceTime);

  useEffect(() => {
    // call actions to search
    if (handleSearch) {
      handleSearch(debouncedQuery);
      return;
    }

    // set query params to search by route
    const query = {
      search: debouncedQuery,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    startTransition(() => {
      router.push(url);
    });
  }, [debouncedQuery, handleSearch, router]);

  const onSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="relative flex flex-row w-full">
      <Input
        id="search"
        placeholder={placeholder}
        className="bg-neutral-950 dark:placeholder:text-neutral-400 stretch pl-8"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      {!isPending && (
        <Search className="h-4 w-4 absolute top-3 left-2 text-neutral-500" />
      )}
      {isPending && (
        <Loader2 className="h-4 w-4 absolute top-3 left-2 text-white" />
      )}
    </div>
  );
};

export default Searchbox;
