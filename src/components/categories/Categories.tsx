'use client';

import { useSearchParams } from 'next/navigation';
import Container from '../ui/Container';
import CategoryItem from './CategoryItem';

const categoryItems = [
  {
    label: 'Pizza',
    image: '/images/icons8-pizza-48.png',
  },
  {
    label: 'Hamburgers',
    image: '/images/icons8-hamburger-48.png',
  },
  {
    label: 'Steak',
    image: '/images/icons8-steak-48.png',
  },
  {
    label: 'Tacos',
    image: '/images/icons8-taco-48.png',
  },
  {
    label: 'Chinese',
    image: '/images/icons8-rice-bowl-48.png',
  },
  {
    label: 'Fish',
    image: '/images/icons8-whole-fish-48.png',
  },
  {
    label: 'Soup',
    image: '/images/icons8-soup-plate-48.png',
  },
  {
    label: 'Dessert',
    image: '/images/icons8-cake-48.png',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const selectedCategory = params?.get('category');

  return (
    <Container>
      <div className="py-8 overflow-x-auto">
        <ul className="flex flex-row items-center justify-between w-full gap-8">
          {categoryItems.map((item) => (
            <CategoryItem
              key={item.label}
              label={item.label}
              image={item.image}
              selected={item.label === selectedCategory}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Categories;
