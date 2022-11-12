import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from 'UI';

const QUERY = gql`
  query {
    categories {
      id,
      emoji,
      name,
      description
    }
  }
`;

function Categories({ onCategoriesSelected }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data } = useQuery(QUERY, { onCompleted: (result) => setSelectedCategories(result.categories) });

  const handleOnChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h1>Select Categories</h1>
      <ul>
        {data && data.categories.map((category) => (
        <li key={category.id}>
          {category.emoji}{category.name}<input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleOnChange(category)}/>
        </li>))}
      </ul>
      <Button color="blue" className="text-title-lg" onClick={() => onCategoriesSelected(selectedCategories)}>
      Confirm
      </Button>
    </div>
  );
}

export default Categories;
