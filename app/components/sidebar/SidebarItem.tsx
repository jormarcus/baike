import { Button } from '../ui/Button';

interface SidebarItemProps {
  label: string;
  // icon: Icon,
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li className="list-none">
      <Button onClick={handleClick} variant="ghost">
        {label}
      </Button>
    </li>
  );
};

export default SidebarItem;
