import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'UI';
import { CATEGORIES } from './queries';

const CategoriesPicker = ({
  onSelect,
}: {
  onSelect(categories: string[]): void;
}): JSX.Element => {
  const { data } = useQuery(CATEGORIES);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const onToggleCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string,
  ) => {
    if (event.target.checked) {
      setSelectedCategories([...new Set([...selectedCategories, categoryId])]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
    }
  };

  return (
    <div className="border-2 rounded p-2">
      {data && (
        <div className="flex flex-col gap-2">
          {data.categories.map((category) => (
            <label key={category.name}>
              {category.emoji}
              {category.name}
              <input
                className="block border border-solid border-blue-nx-base"
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={(event) => onToggleCategory(event, category.id)}
              />
            </label>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={() => onSelect(selectedCategories)}
        disabled={selectedCategories.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default CategoriesPicker;
