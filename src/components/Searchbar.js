import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchImg, setSearchImgState] = useState('');

  const handleChange = e => {
    setSearchImgState(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchImg);
    setSearchImgState('');
  };

  return (
    <header className="searchbar">
      <form onSubmit={handleSubmit} className="searchForm">
        <button type="submit" className="searchForm_button">
          <span className="searchForm_button_label">Search</span>
        </button>

        <input
          className="searchForm_input"
          name="search"
          type="text"
          value={searchImg}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
