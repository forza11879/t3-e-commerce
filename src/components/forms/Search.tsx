import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search: React.FC = () => {
  const onSearch = (value: string) => console.log(value);

  return (
    <Input.Search
      onSearch={onSearch}
      placeholder="Search..."
      // className="flex-grow"
      className="flex-shrink"
      style={{ minWidth: "100px" }}
      prefix={<SearchOutlined />}
    />
  );
};

export default Search;
