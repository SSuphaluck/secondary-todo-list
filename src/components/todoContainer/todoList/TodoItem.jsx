import TodoForm from '../../TodoForm';
import TodoContent from './TodoContent';

function TodoItem({ todo, editingTodo, openEdit }) {
  const { completed } = todo;
  return (
    <li
      className={`list-group-item p-3 callout-${
        completed ? 'success' : 'warning'
      }`}
    >
      {editingTodo.id === todo.id ? (
        <TodoForm />
      ) : (
        <TodoContent
          todo={todo}
          openEdit={openEdit}
        />
      )}
    </li>
  );
}

export default TodoItem;
