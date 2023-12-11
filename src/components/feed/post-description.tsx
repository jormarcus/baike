'use client';

import { useMemo, useState } from 'react';

import { truncateString } from '@/helpers/post-helper';

const PostDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  description =
    'In the 20 years before Takeru Kobayashis debut at the Nathans Famous hot dog eating contest, the average champion had to eat about 16 hot dogs and buns to win the contests “Mustard Belt” prize.';

  const truncatedDescription = useMemo(() => {
    if (!isDescriptionExpanded) {
      // TODO: Change this from 120, it still wraps to the third line if the title is long
      return truncateString(description, 120);
    }
  }, [description, isDescriptionExpanded]);

  return (
    <span>
      {description.length < 120 || isDescriptionExpanded ? (
        <p className="inline whitespace-normal overflow-hidden text-sm">
          {description}
        </p>
      ) : (
        <p className="inline whitespace-normal overflow-hidden text-sm leading-[18px]">
          {truncatedDescription}
          <span className="text-md">...&nbsp;</span>
          <div
            onClick={() => setIsDescriptionExpanded(true)}
            className="text-sm text-neutral-500 hover:text-neutral-300 cursor-pointer"
          >
            more
          </div>
        </p>
      )}
    </span>
  );
};

export default PostDescription;
