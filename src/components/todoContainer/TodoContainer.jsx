import { Fragment, useEffect, useState } from 'react';
import SearchText from './SearchText';
import SearchStatus from './SearchStatus';
import PageLimit from './PageLimit';
import Sort from './Sort';
import TodoList from '../todoList/TodoList';
import Pagination from '../Pagination';

function TodoContainer(props) {
  const [searchText, setSearchText] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [sort, setSort] = useState('');
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // const queryString = `?title=${searchText}&completed=${searchStatus}&sort=${sort}`;
    const queryString = [];
    if (searchText) {
      queryString.push('title=' + searchText);
    }
    if (searchStatus) {
      queryString.push('completed=' + searchStatus);
    }
    if (sort) {
      queryString.push('sort=' + sort);
    }
    queryString.push('page=' + currentPage);
    queryString.push('limit=' + pageLimit);
    props.fetchTodos(queryString.length ? '?' + queryString.join('&') : '');

    // const timerId = setTimeout(() => {
    //   props.fetchTodos(queryString.length ? '?' + queryString.join('&') : '');
    // }, 1000);
    // return () => clearTimeout(timerId);
  }, [props]);

  useEffect(() => {
    setSearchText('');
    setSearchStatus('');
    setSort('');
    setPageLimit(5);
    setCurrentPage(1);
  }, [props.trigger]);

  const numPage = Math.ceil(props.total / pageLimit);

  return (
    <Fragment>
      <div className="my-2 d-flex gap-3">
        <SearchText
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClear={() => setSearchText('')}
        />
        <SearchStatus
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        />
      </div>
      <div className="my-2 d-flex justify-content-between">
        <PageLimit
          value={pageLimit}
          onChange={(e) => {
            setPageLimit(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Sort
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
      <TodoList
        todos={props.todos}
        fetchTodos={props.fetchTodos}
      />
      <div className="my-2 d-flex justify-content-between align-items-center">
        <small className="text-muted">
          Showing {(currentPage - 1) * pageLimit + 1} to{' '}
          {pageLimit * currentPage >= props.total
            ? props.total
            : pageLimit * currentPage}{' '}
          of {props.total} entries
        </small>
        <Pagination
          numPage={numPage}
          currentPage={currentPage}
          onClick={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </Fragment>
  );
}

export default TodoContainer;
