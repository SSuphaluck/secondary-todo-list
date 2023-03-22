import { Component } from 'react';
import axios from 'axios';
import TodoContainer from './components/todoContainer/TodoContainer';
import TodoForm from './components/TodoForm';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:8080/todos')
      .then((res) => {
        this.setState({ todos: res.data.todos });
      })
      .catch((err) => console.log(err));
  }

  createTodo = (title) => {
    axios
      .post('http://localhost:8080/todos', { title, completed: false })
      .then((res) => {
        this.setState({ todos: [res.data.todo, ...this.state.todos] });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div
        className="container mt-5 mb-3"
        style={{ maxWidth: 576 }}
      >
        <div className="my-4">
          <TodoForm onSubmit={this.createTodo} />
        </div>
        <TodoContainer todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
