import { ChefHat, CircleMinus, Expand } from 'lucide-react';
import Box from '../ui/box';

const RightSidebarHeading = () => {
  return (
    <Box className="flex p-4 justify-between items-center mb-2">
      <CircleMinus size={25} />
      <ChefHat size={30} />
      <Expand size={25} />
    </Box>
  );
};

export default RightSidebarHeading;
