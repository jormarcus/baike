import CollectionsHeader from '@/components/collections/collections-header';
import CollectionsSidebar from './collections-sidebar';

interface CollectionsLayoutProps {
  children: React.ReactNode;
}

const CollectionsLayout = async ({ children }: CollectionsLayoutProps) => {
  return (
    <div className="flex flex-col max-h-screen overflow-hidden">
      <CollectionsHeader />
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
};

export default CollectionsLayout;
