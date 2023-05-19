import { Link } from "react-router-dom";
import * as ITBooksAPI from "../../services/itbooks-api";

// generating pagination dynamically based on the current page to get a fixed number of page items (9 items)
function indexes(page: number, total: number) {
  let start, end;
  let result = [];
  // if the count of pages is less or equal to 9, then return page items "as-is"
  if (total < 10) {
    for (let i = 1; i <= total; i++) {
      result.push(i);
    }
    return result;
  }
  // if the current page is less than 6, then starting pagination from the first page
  if (page < 6) {
    start = 1;
    // otherwise show two pages BEFORE and after the current page
  } else {
    start = Math.min(page - 2, total - 6);
  }
  // if the current page is more than (count - 5), then ending pagination by the last page
  if (page > total - 5) {
    end = total;
    // otherwise show two pages before and AFTER the current page
  } else {
    end = Math.max(page + 2, 7);
  }
  // generating the initial pagination array
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  // if the pagination array doesn't start from the first page,
  // then add  the first page and divider following it to the start of the array
  if (start > 1) {
    result = [1, "...", ...result];
  }
  // if the pagination array doesn't end with the last page,
  // then add the last page and divider preceding it to the end of the array
  if (end < total) {
    result = [...result, "...", total];
  }

  return result;
}

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  baseURI: string;
  searchQuery?: string;
}> = ({ currentPage, totalPages, baseURI, searchQuery }) => {
  const baseURL =
    searchQuery && searchQuery !== ITBooksAPI.defaultQuery
      ? `/${baseURI}/query/${encodeURI(searchQuery)}/page/`
      : `/${baseURI}/page/`;
  return (
    <nav className="mb-5">
      <ul className="pagination flex-wrap">
        <li className={currentPage > 1 ? "page-item" : "page-item disabled"}>
          <Link to={baseURL + (currentPage - 1)} className="page-link">
            Previous
          </Link>
        </li>
        {indexes(currentPage, totalPages).map((page, index) => {
          if (page === currentPage) {
            return (
              <li className="page-item active" key={index}>
                <span className="page-link">{page}</span>
              </li>
            );
          } else if (page === "...") {
            return (
              <li className="page-item disabled" key={index}>
                <span className="page-link">{page}</span>
              </li>
            );
          } else {
            return (
              <li className="page-item" key={index}>
                <Link to={baseURL + page} className="page-link">
                  {page}
                </Link>
              </li>
            );
          }
        })}
        <li
          className={
            currentPage < totalPages ? "page-item" : "page-item disabled"
          }
        >
          <Link to={baseURL + (currentPage + 1)} className="page-link">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
