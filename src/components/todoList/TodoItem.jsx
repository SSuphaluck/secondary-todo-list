import axios from 'axios';
import { useState } from 'react';
import TodoForm from '../TodoForm';
import TodoContent from './TodoContent';

function TodoItem(props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmitEdit = async (title) => {
    try {
      await axios.put('http://localhost:8080/todos/' + props.todo.id, {
        title,
        completed: props.todo.completed
      });
      props.fetchTodos();
      setIsEditing(false);
    } catch (err) {}
  };

  return (
    <li
      className={`list-group-item p-3 callout-${
        props.todo.completed ? 'success' : 'warning'
      }`}
    >
      {isEditing ? (
        <TodoForm
          onSubmit={handleSubmitEdit}
          onCancel={() => setIsEditing(false)}
          initialValue={props.todo.title}
        />
      ) : (
        <TodoContent
          todo={props.todo}
          fetchTodos={props.fetchTodos}
          openEdit={() => setIsEditing(true)}
        />
      )}
    </li>
  );
}

export default TodoItem;
