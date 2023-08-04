import { useState } from 'react';
import { Input } from '../inputs/Input';
import { Search } from 'lucide-react';

interface SearchboxProps {
  handleSearch: (query: string) => void;
}

const Searchbox: React.FC<SearchboxProps> = ({ handleSearch }) => {
  const [query, setQuery] = useState<string>('');

  const onSearch = (query: string) => {
    setQuery(query);
    handleSearch(query);
  };

  return (
    <div className="relative flex flex-row">
      <Input
        id="recipe-search"
        placeholder="Search your recipes..."
        className="lg:max-w-sm md:lg:max-w-sm sm:max-w-md bg-neutral-950 dark:placeholder:text-neutral-400 stretch pl-8"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <Search className="h-4 w-4 absolute top-3 left-2 text-neutral-500" />
    </div>
  );
};

export default Searchbox;
