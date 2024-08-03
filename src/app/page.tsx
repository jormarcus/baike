import { getSession } from 'next-auth/react';
import AuthenticatedPage from './(home)/authenticated-page';
import UnauthenticatedPage from './(home)/unauthenticated-page';
import ResizableLayout from './(home)/_components/resizable-layout';

export default async function Home() {
  const session = await getSession();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      {session ? <AuthenticatedPage /> : <UnauthenticatedPage />}
    </>
  );
}
