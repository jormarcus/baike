import RecipesPageHeader from '@/components/recipes/RecipesPageHeader';

interface RecipesLayoutProps {
  children: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <RecipesPageHeader />
      <div className="h-full m-16">{children}</div>
    </div>
  );
};

export default RecipesLayout;
