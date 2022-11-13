import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { CheckmarkIcon, CloseIcon } from 'icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, IconButton, Loader, Popup, Switch } from 'UI';
import useSound from 'use-sound';
import { CATEGORIES } from '../../graphql/queries/categories.query';
import { Category } from '../../types';

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

  if (loading) {
    return (
      <span className="mx-auto scale-75 md:scale-100 lg:scale-150 inline-block">
        <Loader />
      </span>
    );
  }

  const Content = (
    <>
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
                <p className="text-body-lg text-secondary-30 text-left">
                  {category.name}
                </p>
                <p
                className="text-body-sm text-secondary-60 max-w-[40ch]"
                dangerouslySetInnerHTML={{ __html: category.description.replace('{0}', 'the current character') }}/>
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
    </>
  );

  return (
    <>
      <Popup
        isOpen={isOpen}
        onClose={() => {}}
        className="hidden lg:!block"
        overlayClassName="hidden lg:grid"
      >
        {Content}
      </Popup>
      <div className="fixed inset-0 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: '50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl py-8 px-4"
        >
          {Content}
        </motion.div>
      </div>
    </>
  );
};

export default CategoriesSelect;
