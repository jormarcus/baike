import { cn } from '@/lib/utils';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground rounded-lg h-fit w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
