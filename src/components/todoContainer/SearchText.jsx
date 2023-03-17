function SearchText(props) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={props.value}
        onChange={props.onChange}
      />
      <button
        className="btn btn-outline-secondary"
        onClick={props.onClear}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}

export default SearchText;
