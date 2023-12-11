'use client';

import { useEffect, useState } from 'react';
import { Avoidance } from '@prisma/client';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { useWelcomeWizard } from '@/context/welcome-wizard-context';
import { Label } from '../ui/label';

interface AvoidanceStepProps {}

const AvoidanceStep: React.FC<AvoidanceStepProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sysAvoidances, setSysAvoidances] = useState<Avoidance[]>([]);
  const { setSelectedAvoidances, onSubmit, selectedAvoidances } =
    useWelcomeWizard();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      avoidances: sysAvoidances,
    },
  });

  useEffect(() => {
    const fetchAvoidances = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/avoidances');
        const { data } = await response.json();
        setSysAvoidances(data);
        reset({ avoidances: data });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvoidances();
  }, [reset]);

  const { fields } = useFieldArray({
    control,
    name: 'avoidances',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.checked) {
      setSelectedAvoidances([...selectedAvoidances, sysAvoidances[index]]);
    } else {
      setSelectedAvoidances(
        selectedAvoidances.filter(
          (a) => a.name !== sysAvoidances[index]['name']
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-2 gap-x-16">
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2">
            <Controller
              render={({ field }) => (
                <>
                  <input
                    type="checkbox"
                    {...field}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <Label>{item.name}</Label>
                </>
              )}
              name={`avoidances.${index}.name`}
              control={control}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default AvoidanceStep;
