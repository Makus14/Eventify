import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Menu, Input, Typography } from "antd";
import classes from "./SearchBar.module.css";

const { Text } = Typography;

interface SearchBarProps {
  total: number;
  category: string;
  onSearch: (query: string) => void;
  onSort: (order: "asc" | "desc") => void;
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
          { key: "desc", label: "По убыванию" },
          { key: "asc", label: "По возрастанию" },
        ],
      },
    ],
  },
];

const SearchBar: React.FC<SearchBarProps> = ({
  total,
  category,
  onSearch,
  onSort,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    onSort(e.key as "asc" | "desc");
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
            className={classes.menuItems}
            onClick={onClick}
            style={{
              width: 200,
              border: "none",
              backgroundColor: "#e7f2f4",
            }}
            // defaultSelectedKeys={["1"]}
            //defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items1}
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
