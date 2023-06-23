'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryItemProps {
  image: string;
  label: string;
  selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  image,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      // convert the params to an object
      currentQuery = qs.parse(params.toString());
    }

    // update the query to include the category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // if the category we clicked on is already selected
    // remove it from the query, to deselect it
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <>
      <li
        key={label}
        onClick={handleClick}
        className={`cursor-pointer flex flex-col items-center gap-2  border-b-2
          p-3
          transition
          hover:text-neutral-100
          ${selected ? 'border-b-neutral-100' : 'border-transparent'}
          ${selected ? 'text-neutral-100' : 'text-neutral-400'}
        `}
      >
        <Image src={image} alt={label} width={40} height={40} />
        <p className="text-sm font-medium">{label}</p>
      </li>
    </>
  );
};

export default CategoryItem;
