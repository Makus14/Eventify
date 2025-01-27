import { Pagination } from "antd";

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
    <div style={{ paddingTop: "40px", paddingBottom: "30px" }}>
      <Pagination
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
