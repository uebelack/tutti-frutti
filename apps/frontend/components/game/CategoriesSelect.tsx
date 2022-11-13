import { useQuery } from '@apollo/client';
import { CheckmarkIcon, CloseIcon } from 'icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, IconButton, Loader, Popup, Switch } from 'UI';
import useSound from 'use-sound';
import { Category } from '../../types';
import { CATEGORIES } from '../../graphql/queries/categories.query';

export const CategoriesSelect = ({
  onSelect,
}: {
  onSelect(categories: string[]): void;
}) => {
  const [playConfirmSfx] = useSound('/sounds/confirm.mp3');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const router = useRouter();

  const { data, loading } = useQuery<{ categories: Category[] }>(CATEGORIES, {
    onCompleted: (d) => {
      setIsOpen(true);
      setSelectedCategories(d.categories.map((c) => c.id));
    },
  });

  const onToggleCategory = (checked: boolean, categoryId: string) => {
    if (checked) {
      setSelectedCategories([...new Set([...selectedCategories, categoryId])]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
    }
  };

  const handleOnConfirm = () => {
    playConfirmSfx();
    onSelect(selectedCategories);
  };

  return loading ? (
    <span className="mx-auto scale-150 inline-block">
      <Loader />
    </span>
  ) : (
    <Popup isOpen={isOpen} onClose={() => {}}>
      <div className="flex items-center justify-between">
        <p className="text-title-md">Choose your categories</p>
        <IconButton
          className="w-6 text-current hover:!bg-blue hover:!bg-opacity-10"
          onClick={() => {
            setIsOpen(false);
            router.push('/');
          }}
        >
          <CloseIcon className="w-1/2" />
        </IconButton>
      </div>
      <div className="flex flex-col gap-2 my-5">
        {data.categories?.map((category) => (
          <label
            key={category.id}
            className="flex items-center border-b border-primary-90 pl-2 pr-5 py-2 gap-16"
          >
            <div className="flex items-center gap-4">
              <p className="text-heading-lg">{category.emoji}</p>

              <div>
                <p className="text-body-lg text-secondary-30">
                  {category.name}
                </p>
                <p className="text-body-sm text-secondary-60 max-w-[40ch]">
                  {category.description}
                </p>
              </div>
            </div>
            <Switch
              checked={selectedCategories.includes(category.id)}
              onChange={(checked) => onToggleCategory(checked, category.id)}
              className="ml-auto"
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          color="blue"
          shape="rounded"
          className="text-body-lg uppercase flex items-center gap-5"
          onClick={handleOnConfirm}
          disabled={selectedCategories.length === 0}
        >
          Confirm
          <CheckmarkIcon className="w-6" />
        </Button>
      </div>
    </Popup>
  );
};

export default CategoriesSelect;
