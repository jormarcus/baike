import Image from 'next/image';

interface WelcomeStepProps {}

const WelcomeStep: React.FC = ({}) => {
  return (
    <div className="flex flex-col">
      <Image
        src="/images/food.svg"
        width={200}
        height={200}
        alt="Baike preview image"
      />
    </div>
  );
};

export default WelcomeStep;
