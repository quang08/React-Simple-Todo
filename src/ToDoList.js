import React from 'react';
import Todo from './Todo';

function ToDoList({todos, toggleTodo}) {
  return (
    todos.map(todo => {
        return(
            <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
        // <>
        //     <div>
        //         <label>
        //             <input type="checkbox" checked={todo.complete}></input>
        //             {todo.name}
        //         </label>
        //     </div> 
        // </>  
        )
    })
  )
}

export default ToDoList
