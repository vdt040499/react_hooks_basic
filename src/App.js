import React, { useState, useEffect } from 'react';
import './App.scss';
// import ToDoList from './components/ToDoList/index';
// import ToDoForm from './components/ToDoForm/index';
import PostList from './components/PostList/index';

function App() {

  const [toDoList, setToDoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }
    console.log('POSTLIST effect');
    fetchPostList();
  }, []);

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

  return (
    <div className="app">
      {/* <ToDoForm onSubmit={handleToDoFormSubmit}/> */}
      {/* <ToDoList todos={toDoList} onToDoClick={handleToDoClick}/> */}
      <PostList posts={postList}/>
    </div>
  );
}

export default App;
