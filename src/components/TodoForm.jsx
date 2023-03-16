import { useState } from 'react';

function TodoForm(props) {
  const [title, setTitle] = useState(props.initialValue || '');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // validate first

    // success validation
    props.onSubmit(title);
    setTitle('');
    // if create mode
    // else edit mode
  };

  const handleClickCancel = () => {
    setTitle('');
    props.onCancel?.(); // ? คือ optional chaining มีผลคล้ายๆ if else คือถ้า props ไหนมีค่านี้ก็ให้เรียกใช้ด้วย ถ้าไม่มีก็ไม่ต้อง
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary">
          <i className="fa-solid fa-check" />
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickCancel}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
