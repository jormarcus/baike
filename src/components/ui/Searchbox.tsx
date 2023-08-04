import { useState } from 'react';
import { Input } from '../inputs/Input';

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
    <div className="flex flex-row">
      <Input
        id="recipe-search"
        placeholder="Search your recipes..."
        className="lg:max-w-sm md:lg:max-w-sm sm:max-w-md bg-neutral-950 dark:placeholder:text-neutral-400 stretch"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Searchbox;
