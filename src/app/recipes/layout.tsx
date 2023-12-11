import RecipesPageHeader from '@/components/recipes/recipes-page-header';

interface RecipesLayoutProps {
  children: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <RecipesPageHeader />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default RecipesLayout;
