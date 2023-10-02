'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Input } from '@/components/inputs/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '../ui/Button';
import { updateProfile } from '@/app/_actions/user-actions';
import ImageUploader from '../ImageUploader';
import {
  UserProfile,
  UserProfileSchema,
} from '@/lib/validators/user-profile-validator';

interface EditProfileModalProps {
  image: string | null;
  name: string;
  email: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  image = '',
  name,
  email,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name,
      email,
      image: image || '',
    },
  });

  const handleOpenChange = () => {
    setIsOpen((prev: any) => !prev);
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await updateProfile(data as UserProfile);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button className="flex max-w-[150px] justify-start gap-1 dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400 whitespace-nowrap">
          Edit Profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader className="flex items-center justify-center border-b pb-4">
          <AlertDialogTitle>Edit Profile</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <div className="rounded-full self-center">
            <ImageUploader
              handleChange={(value) => setValue('image', value)}
              value={image || ''}
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              {...register('name', { required: true })}
              disabled={isLoading}
              placeholder="Name"
              defaultValue={name}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              {...register('email', { required: true })}
              disabled={isLoading}
              placeholder="JohnDoe@mail.com"
            />
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProfileModal;
