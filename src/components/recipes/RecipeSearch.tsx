import { Input } from '../inputs/Input';

interface RecipeSearchProps {}

const RecipeSearch: React.FC<RecipeSearchProps> = ({}) => {
  return (
    <div className="flex flex-row pt-8">
      <Input
        id="recipe-search"
        placeholder="Search your recipes..."
        className="lg:max-w-sm md:lg:max-w-sm sm:max-w-md"
      ></Input>
    </div>
  );
};

export default RecipeSearch;
