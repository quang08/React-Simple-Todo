import React, { useEffect, useRef, useState } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = 'abc'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //persist the todo items between re-renders
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(prevTodos => [...prevTodos,...storedTodos]);
  },[])

  //save items to local storage everytime todos array changes
  useEffect(()=>{ 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },[todos]); 

  //toggle for checkbox
  function toggleTodo(id){
    const newTodos = [...todos]; //create a copy of the todos (good practice: should not alter the originals)
    const todo = newTodos.find(todo => todo.id === id); //find the todo in the copy that matches the passed in id
    todo.complete = !todo.complete; //toggle
    setTodos(newTodos); 
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null; //clear input when click add todo
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete); //return an array that are not completed items
    setTodos(newTodos);//only not completed items left
  }

  return (
   <>
    <ToDoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type='text'></input>

    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>

    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
   </>
  );
}

export default App;
