import { Settings, Share2 } from 'lucide-react';
import Image from 'next/image';

import { getCurrentUser } from '../../_actions/user-actions';
import { Button } from '@/components/ui/Button';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ReportUserButton from '@/components/profile/ReportButton';
import EditProfileModal from '@/components/profile/EditProfileModal';
import EmptyState from '@/components/ui/EmptyState';

async function ProfilePage({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  const isOwnProfile = currentUser?.id === parseInt(params.id);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <div className="flex flex-col items-center mt-16 h-full max-w-screen-md mx-auto md:px-8 px-4">
      <div className="flex self-end items-center gap-2">
        <Share2 className="h-6 w-6" />

        {isOwnProfile ? (
          <Settings className="h-6 w-6" />
        ) : (
          <ReportUserButton content="Report user" />
        )}
      </div>
      <div className="pr-20 w-full">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-12 items-center">
              <Image
                className="rounded-full"
                width={150}
                height={150}
                src={currentUser?.image || '/images/default-profile.png'}
                alt="Profile Picture"
              />

              <div className="flex flex-col justify-center gap-2">
                {currentUser?.name ? (
                  <h1 className="text-3xl font-bold mt-2">
                    {currentUser.name}
                  </h1>
                ) : null}
                <div className="flex gap-2 font-light">
                  <span className="flex gap-2">
                    <span className="font-bold">{0}</span> <span>Posts</span>
                  </span>
                  <span className="flex gap-2">
                    <span className="font-bold">{0}</span>
                    <span>Following</span>
                  </span>
                  <span className="flex gap-2">
                    <span className="font-bold">{0}</span>
                    <span>Followers</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              {isOwnProfile ? (
                <EditProfileModal
                  image={currentUser.image}
                  name={currentUser.name}
                  email={currentUser.email}
                />
              ) : (
                <Button className="bg-amber-500 text-white">Follow</Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProfileTabs />
    </div>
  );
}

export default ProfilePage;
