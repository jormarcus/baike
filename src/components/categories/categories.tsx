'use client';

import { useSearchParams } from 'next/navigation';
import CategoryItem from './category-item';
import categoryData from './categories-data';

const Categories = () => {
  const params = useSearchParams();
  const selectedCategory = params?.get('category');

  return (
    <div className="py-4 overflow-x-auto flex flex-col items-center">
      <ul
        className="flex flex-row items-center justify-center gap-4 mx-16
          overflow-x-auto max-w-6xl"
      >
        {categoryData.map((item) => (
          <CategoryItem
            key={item.label}
            label={item.label}
            image={item.image}
            selected={item.label === selectedCategory}
          />
        ))}
      </ul>
      <div className="text-neutral-400 text-xs">
        Icons by{' '}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </div>
  );
};

export default Categories;
