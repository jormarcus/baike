'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import WelcomeStep from './WelcomeStep';
import AvoidanceStep from './AvoidanceStep';
import { Button } from '../ui/Button';
import { useWelcomeWizard } from '@/context/WelcomeWizardContext';

interface WelcomeWizardProps {}

const WelcomeWizard: React.FC<WelcomeWizardProps> = ({}) => {
  const welcomeWizard = useWelcomeWizard();
  const {
    isOpen,
    activeStep,
    isNewUser,
    handleBack,
    handleNext,
    handleOpenChange,
    onSubmit,
  } = welcomeWizard;

  const [steps, setSteps] = useState<
    {
      key: string;
      title: string;
      description: string;
      isDone: boolean;
      component: any;
    }[]
  >([
    {
      key: 'firstStep',
      title: 'Welcome to Baike!',
      description:
        'Save recipes from your favorite chefs and blogs. Add your own recipes and share them with others. Easily compare and discover new delicious recipes.',
      isDone: true,
      component: <WelcomeStep />,
    },
    {
      key: 'secondStep',
      title: 'Any avoidances or allergies we should be aware of?',
      description: '',
      isDone: false,
      component: <AvoidanceStep />,
    },
  ]);

  // only show this wizard, if its a new user
  if (!isNewUser) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Show wizard</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {steps[activeStep]['title']}
          </DialogTitle>
          <DialogDescription className="p-4">
            {steps[activeStep]['description']}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {steps[activeStep]['component']}
        </div>
        <DialogFooter className="self-end">
          {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button type="submit" onClick={onSubmit}>
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeWizard;
