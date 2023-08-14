import React, { useEffect, useState } from "react";
import "./style.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./components/model";
import { MdHomeFilled } from "react-icons/md";

const App: React.FC = () => {
  const storedValue = localStorage.getItem('todos');
  const valueLocalStorage = storedValue ? JSON.parse(storedValue) : null;
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>(
    valueLocalStorage !== null ? (
      valueLocalStorage
    )
    : (
      []
    )
  )
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  useEffect( () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;


    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    const active = todos;
    const complete = CompletedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <header>
          <a href="https://kallavero.fr">
            <MdHomeFilled />
          </a>
          <h1 className="heading">Todo List</h1>
        </header>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
