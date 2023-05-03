import getCurrentUser from './actions/getCurrentUser';
import Logo from './components/ui/Logo';
import Search from './components/Search';
import Sidebar from './components/Sidebar';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-[100vh]">
      <Sidebar currentUser={currentUser} />
      <div className="relative grow md:flex justify-center items-start h-full w-full mx-auto max-w-screen-md px-4 py-6 md:px-6">
        <div className="w-full">
          <div className="pt-4 pb-4 md:pb-6 flex items-center justify-center">
            <Logo />
          </div>
          <div>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
