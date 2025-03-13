import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Menu, Input, Typography } from "antd";
import classes from "./SearchBar.module.css";

const { Text } = Typography;

interface SearchBarProps {
  total: number;
  category: string;
  onSearch: (query: string) => void;
}

type MenuItem = Required<MenuProps>["items"][number];

const items1: MenuItem[] = [
  {
    key: "sub1",
    label: "По рейтингу",
    children: [
      {
        key: "g1",
        type: "group",
        children: [
          { key: "1", label: "По убыванию" },
          { key: "2", label: "По возрастанию" },
        ],
      },
    ],
  },
];

const items2: MenuItem[] = [
  {
    key: "sub2",
    label: "Вблизи метро",
    children: [
      {
        key: "g1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
    ],
  },
];

const SearchBar: React.FC<SearchBarProps> = ({ total, category, onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.menuContainer}>
        <div className={classes.textContainer}>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            {category}
          </Text>
          <Text style={{ fontSize: "13px" }}>Найдено: {total}</Text>
        </div>
        <div className={classes.menuGroup}>
          <Menu
            onClick={onClick}
            style={{
              width: 200,
              backgroundColor: "#e7f2f4",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items1}
          />
          <Menu
            onClick={onClick}
            style={{ width: 200, backgroundColor: "#e7f2f4", borderRadius: 12 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items2}
          />
        </div>
      </div>
      <div className={classes.inputContainer}>
        <Input
          className={classes.input}
          placeholder="Поиск мест"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
