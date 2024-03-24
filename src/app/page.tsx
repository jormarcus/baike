import AuthenticatedPage from './(home)/authenticated-page';
import UnauthenticatedPage from './(home)/unauthenticated-page';
import { getCurrentUser } from './_actions/user-actions';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      {currentUser ? <AuthenticatedPage /> : <UnauthenticatedPage />}
    </>
  );
}
