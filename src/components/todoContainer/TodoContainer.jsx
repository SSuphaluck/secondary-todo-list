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
    props.fetchTodos(queryString.length ? '?' + queryString.join('&') : '');

    // const timerId = setTimeout(() => {
    //   props.fetchTodos(queryString.length ? '?' + queryString.join('&') : '');
    // }, 1000);
    // return () => clearTimeout(timerId);
  }, [searchText, searchStatus, sort, props]);

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
        <PageLimit />
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
        <small className="text-muted">Showing 6 to 10 of 12 entries</small>
        <Pagination />
      </div>
    </Fragment>
  );
}

export default TodoContainer;
