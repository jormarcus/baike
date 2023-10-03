'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useState } from 'react';
import WelcomeStep from './WelcomeStep';
import AllergiesStep from './AllergiesStep';
import AvoidanceStep from './AvoidanceStep';
import CreatorsStep from './CreatorsStep';
import { Button } from '../ui/Button';

interface WelcomeWizardProps {}

const WelcomeWizard: React.FC<WelcomeWizardProps> = ({}) => {
  const userPreferences = useUserPreferences();
  const { isNewUser, setIsNewUser } = userPreferences;

  const [isOpen, setIsOpen] = useState(true);

  const [steps, setSteps] = useState([
    {
      key: 'firstStep',
      title: 'Welcome to Baike!',
      description:
        'Save recipes from your favorite chefs and blogs. Add your own recipes and share them with others. Easily compare and discover new delicious recipes.',
      isDone: true,
      component: WelcomeStep,
    },
    {
      key: 'secondStep',
      title: 'Any allergies we should be aware of?',
      description: '',
      isDone: false,
      component: AllergiesStep,
    },
    {
      key: 'thirdStep',
      title: 'Any avoidances we should be aware of?',
      description: '',
      isDone: false,
      component: AvoidanceStep,
    },
    {
      key: 'finalStep',
      title: 'Follow creators on Baike',
      description: '',
      isDone: false,
      component: CreatorsStep,
    },
  ]);
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // only show this wizard, if its a new user
  if (!isNewUser) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    // we do not want to show the wizard again, if the user closes it
    if (!open) {
      setIsNewUser(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{steps[activeStep]['title']}</DialogTitle>
            <DialogDescription>
              {steps[activeStep]['description']}
            </DialogDescription>
          </DialogHeader>
          {steps[activeStep]['component']({})}
          <DialogFooter>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WelcomeWizard;
