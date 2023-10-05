import Image from 'next/image';

interface WelcomeStepProps {}

const WelcomeStep: React.FC = ({}) => {
  return (
    <div>
      <Image
        src="/images/baike-preview.png"
        height={400}
        width={400}
        alt="Baike preview image"
        priority
        className="object-cover aspect-square"
      />
    </div>
  );
};

export default WelcomeStep;
