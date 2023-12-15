import CollectionsHeader from '@/components/collections/collections-header';
import CollectionsSidebar from './collections-sidebar';

interface CollectionsLayoutProps {
  children: React.ReactNode;
}

const CollectionsLayout = async ({ children }: CollectionsLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <CollectionsHeader />
      <div className="flex max-h-[100vh]">
        <CollectionsSidebar />
        <div className="w-full flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default CollectionsLayout;
