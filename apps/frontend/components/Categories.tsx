import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
      <ul>
        {data && data.categories.map((category) => (
        <li key={category.id}>
          {category.emoji}{category.name}<input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleOnChange(category)}/>
        </li>))}
      </ul>
      <button onClick={() => onCategoriesSelected(selectedCategories)}>Confirm</button>
    </div>
  );
}

export default Categories;
