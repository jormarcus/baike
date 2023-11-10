import RecipesPageHeader from '@/components/recipes/RecipesPageHeader';

interface RecipesLayoutProps {
  children: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col max-h-[100vh]">
      <RecipesPageHeader />
      <div>{children}</div>
    </div>
  );
};

export default RecipesLayout;
