import CollectionsHeader from '@/components/collections/CollectionsHeader';

interface CollectionsLayoutProps {
  children: React.ReactNode;
}

const CollectionsLayout: React.FC<CollectionsLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <CollectionsHeader />
      <div className="h-full m-16">{children}</div>
    </div>
  );
};

export default CollectionsLayout;
