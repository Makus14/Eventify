import { Pagination } from "antd";

import classes from "./PaginationComponent.module.css";

interface PaginationComponentProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  pageSize,
  total,
  onChange,
}) => {
  return (
    <div style={{ paddingBottom: "30px" }}>
      <Pagination
        className={classes.paginationStyle}
        showSizeChanger={false}
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationComponent;
