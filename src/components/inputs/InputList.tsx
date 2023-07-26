'use client';

import { cn } from '@/lib/utils';
import { Input } from './Input';
import { InputListValues } from '@/types';

interface InputListProps {
  fieldName: keyof InputListValues;
  inputValues: string[];
  firstPlaceholder: string;
  followingPlaceholder: string;
  handleInputListChange: (
    field: keyof InputListValues,
    value: string,
    index: number
  ) => void;
  handleInputListBlur: (field: keyof InputListValues, values: string[]) => void;
  className?: string;
}

const InputList: React.FC<InputListProps> = ({
  fieldName,
  inputValues,
  firstPlaceholder,
  followingPlaceholder,
  handleInputListChange,
  handleInputListBlur,
  className,
}) => {
  console.log('inputValues', inputValues);

  const handleInputBlur = (index: number) => {
    console.log('handleInputBlur: ', index);
    if (inputValues[index] === '' && index !== 0) {
      const updatedInputList = inputValues.filter(
        (_inputValue, idx) => index !== idx
      );
      console.log('updatedInputList', updatedInputList);
      handleInputListBlur(fieldName, updatedInputList);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      {inputValues.map((inputValue, index) => (
        <Input
          key={index}
          id={`input-${index}`}
          value={inputValue}
          placeholder={index === 0 ? firstPlaceholder : followingPlaceholder}
          onChange={(e) =>
            handleInputListChange(fieldName, e.target.value, index)
          }
          onBlur={() => handleInputBlur(index)}
          className="w-full"
        />
      ))}
    </div>
  );
};

export default InputList;
