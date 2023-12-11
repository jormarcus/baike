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
      <Button variant="ghost">
        <Minus
          className="bg-neutral-950 text-white rounded-md
      "
        />
      </Button>
      <div className="flex gap-2 items-center">
        <span>{servings || 1}</span>
        <span>{servingsLabel}</span>
      </div>
      <Button variant="ghost" className="w-fit">
        <Plus
          className="bg-neutral-950 text-white rounded-md
      "
        />
      </Button>
    </div>
  );
};

export default ServingsModifier;
