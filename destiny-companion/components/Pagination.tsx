import Pagination from "react-bootstrap/Pagination";

export default function PaginationCustom({
  itemPerPage,
  totalItems,
  paginate,
  currentPage
}:any) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumber.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="sm">{pageNumber}</Pagination>
    </div>
  );
}
