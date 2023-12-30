'use client';

import qs from 'query-string';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from './input';
import { useDebounce } from '@/hooks/use-debounce';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchValue = searchParams.get('search') || '';
  const [query, setQuery] = useState<string>(initialSearchValue);
  const debouncedQuery = useDebounce<string>(query, debounceTime);

  useEffect(() => {
    const query = {
      search: debouncedQuery,
    };

    if (handleSearch) {
      handleSearch(debouncedQuery);
      return;
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedQuery, handleSearch, router]);

  return (
    <div className="relative flex flex-row w-full">
      <Input
        placeholder={placeholder}
        className="stretch pl-8"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="h-4 w-4 absolute top-3 left-2 text-neutral-500" />
    </div>
  );
};

export default Searchbox;
