import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './App.scss';
// import ToDoList from './components/ToDoList/index';
// import ToDoForm from './components/ToDoForm/index';
import PostList from './components/PostList/index';
import Pagination from './components/Pagination/index';
import PostFiltersForm from './components/PostFiltersForm/index';
import Clock from './components/Clock/index';
import BetterClock from './components/BetterClock/index';

function App() {

  const [toDoList, setToDoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      try {
        //_limit=100_page=1
        const paramsString = queryString.stringify(filters);
        console.log(paramsString);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }
    console.log('POSTLIST effect');
    fetchPostList();
  }, [filters]);

  useEffect(() => {
    console.log('TODOLIST effect');
  })

  function handleToDoClick(todo){
    const index = toDoList.findIndex(x => x.id === todo.id)
    if(index < 0) return;

    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDoList(newToDoList);
  }

  function handleToDoFormSubmit(formValues){
    console.log(formValues);

    const newToDoList = [...toDoList];
    const newToDo = {
      id: toDoList.length + 1,
      ...formValues
    }
    newToDoList.push(newToDo);
    setToDoList(newToDoList);
  }

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFiltersChange(newFilters) {
    console.log('New filter: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  return (
    <div className="app">
      {/* <ToDoForm onSubmit={handleToDoFormSubmit}/> */}
      {/* <ToDoList todos={toDoList} onToDoClick={handleToDoClick}/> */}
      
      {/* <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/> */}

      { showClock && <Clock/>}
      <BetterClock/>
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
    </div>
  );
}

export default App;
