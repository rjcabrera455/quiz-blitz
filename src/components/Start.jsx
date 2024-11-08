import { useRef, useState } from 'react';

function Start({ categories, dispatch }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  function handleStart() {
    dispatch({ type: 'start', category: selectedCategory });
  }

  return (
    <div>
      <select
        name=""
        id=""
        className="p-2.5 border w-full rounded-md mb-5 cursor-pointer"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>
          Please Select Category
        </option>

        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div className="text-right ">
          <button
            className="py-2.5 px-5 rounded-md bg-body text-white"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default Start;
