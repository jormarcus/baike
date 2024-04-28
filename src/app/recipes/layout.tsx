interface RecipesLayoutProps {
  children: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default RecipesLayout;
