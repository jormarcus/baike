import WelcomeWizard from '@/components/welcome-wizard/welcome-wizard';
import ChatInputHome from '@/components/chat/chat-input-home';

export default async function Home() {
  return (
    <div className="flex flex-col items-center mt-16 h-full max-w-screen-md mx-auto md:px-8 px-4">
      <WelcomeWizard />
    </div>
  );
}
