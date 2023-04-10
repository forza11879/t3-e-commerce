import type { Dispatch, SetStateAction } from 'react';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>
}

const LocalSearch = ({ keyword, setKeyword }: Props) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setKeyword(value);
  };


  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default LocalSearch;
