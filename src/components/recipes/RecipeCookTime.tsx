import { formatCookingDuration } from '@/helpers/date-time-helper';
import { Clock4 } from 'lucide-react';

interface RecipeCookTimeProps {
  label: string;
  hours: number | null;
  minutes: number | null;
}

const RecipeCookTime: React.FC<RecipeCookTimeProps> = ({
  label,
  hours,
  minutes,
}) => {
  if (!hours && !minutes) return null;

  return (
    <div className="flex items-center gap-2">
      <Clock4 height={16} width={16} /> {label}:
      <span>{formatCookingDuration(hours || 0, minutes || 0)}</span>
    </div>
  );
};

export default RecipeCookTime;
