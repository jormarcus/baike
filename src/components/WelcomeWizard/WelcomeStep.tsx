import Image from 'next/image';

interface WelcomeStepProps {}

const WelcomeStep: React.FC = ({}) => {
  return (
    <Image
      src="/images/baike-preview.png"
      fill
      alt="Baike preview image"
      priority
      className="object-cover w-full h-full aspect-square"
    />
  );
};

export default WelcomeStep;
