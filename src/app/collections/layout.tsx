import CollectionsHeader from '@/components/collections/collections-header';

interface CollectionsLayoutProps {
  children: React.ReactNode;
}

const CollectionsLayout: React.FC<CollectionsLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <CollectionsHeader />
      <div className="h-full ml-24 mr-48 py-16 flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default CollectionsLayout;
