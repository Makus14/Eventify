import React, { useState } from "react";

import { Input } from "antd";
import classes from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("Input value:", e.target.value);
  };

  return (
    <div className={classes.searchContainer}>
      <Input
        className={classes.inputContainer}
        placeholder="Поиск мест"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
