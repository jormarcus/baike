import { useAddRecipeModal } from '@/app/context/AddRecipeModal';
import Modal from './Modal';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import { createRecipe } from '@/app/actions/recipe-actions';

interface AddRecipeModalProps {}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({}) => {
  const addRecipeModal = useAddRecipeModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
    },
  });

  const onAdd: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await createRecipe({
        id: '',
        title: data.title,
        image: null,
        description: null,
        instructions: null,
        servings: null,
      });
      addRecipeModal.onClose();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        placeholder="Titile"
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addRecipeModal.isOpen}
      title="addRecipe"
      actionLabel="Add new recipe"
      onClose={addRecipeModal.onClose}
      onSubmit={handleSubmit(onAdd)}
      body={bodyContent}
    />
  );
};

export default AddRecipeModal;
