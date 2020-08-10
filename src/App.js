import React, { useState } from 'react';
import './App.scss';
import ToDoList from './components/ToDoList/index';
import ToDoForm from './components/ToDoForm/index';
function App() {

  const [toDoList, setToDoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

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
      <ToDoForm onSubmit={handleToDoFormSubmit}/>
      <ToDoList todos={toDoList} onToDoClick={handleToDoClick}/>
    </div>
  );
}

export default App;
