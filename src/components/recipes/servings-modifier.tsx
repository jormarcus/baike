'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useMemo } from 'react';

interface ServingsModifierProps {
  servings: number | null;
}

const ServingsModifier: React.FC<ServingsModifierProps> = ({ servings }) => {
  const servingsLabel = useMemo(() => {
    return servings === 1 ? 'serving' : 'servings';
  }, [servings]);
  return (
    <div className="flex items-center border border-neutral-500 w-fit rounded-xl p-1">
      <Button className="text-foreground font-medium bg-background-tilted-base px-2 mx-2 my-1">
        <Minus className="rounded-full" />
      </Button>
      <div className="flex gap-2 items-center">
        <span>{servings || 1}</span>
        <span>{servingsLabel}</span>
      </div>
      <Button className="w-fit text-foreground font-medium bg-background-tilted-base px-2 mx-2 my-1">
        <Plus className="rounded-full" />
      </Button>
    </div>
  );
};

export default ServingsModifier;
