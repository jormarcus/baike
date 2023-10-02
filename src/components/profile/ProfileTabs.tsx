'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/Icons';

interface ProfileTabsProps {}

const ProfileTabs: React.FC<ProfileTabsProps> = ({}) => {
  return (
    <div className="group relative my-4 flex flex-col space-y-2 w-full">
      <Tabs defaultValue="activity" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-center rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="activity"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Created
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="activity" className="relative rounded-md border">
          <div className="activity flex min-h-[350px] w-full justify-center p-10 items-center">
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              Activity
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="created" className="relative rounded-md border">
          <div className="created flex min-h-[350px] w-full justify-center p-10 items-center">
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              Created
            </React.Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
