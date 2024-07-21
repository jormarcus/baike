import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode, useState } from 'react';

type RecipeTabsProps = {
  children: ReactNode;
};

const RecipeTabs = ({ children }: RecipeTabsProps) => {
  const [tabs, setTabs] = useState(['home']);
  const [selectedTab, setSelectedTab] = useState('home');

  return (
    <Tabs defaultValue="home" className="w-full py-2">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={selectedTab}>{children}</TabsContent>
    </Tabs>
  );
};

export default RecipeTabs;
