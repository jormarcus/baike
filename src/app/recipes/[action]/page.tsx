import { useParams } from 'next/navigation';

interface AddEditRecipePageProps {
  params: {
    recipeId: string;
  };
}

const AddEditRecipePage: React.FC<AddEditRecipePageProps> = ({ params }) => {
  console.log('params', params);
  return <div>AddEditRecipePage</div>;
};

export default AddEditRecipePage;
