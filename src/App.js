import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: text,
      done: false,
    };
    setItems((items) => [...items, newItem]);
    setText("");
  };

  const markItemCompleted = (itemId) => {
    var updatedItems = items.map((item) => {
      if (itemId === item.id) item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    setItems([].concat(updatedItems));
  };

  const handleDeleteItem = (itemId) => {
    var updatedItems = items.filter((item) => {
      return item.id !== itemId;
    });

    setItems([].concat(updatedItems));
  };

  return (
    <div className="cencen">
      <h3 className="apptitle">TO DO LIST</h3>
      <div className="row">
        <div className="col-md-3">
          <TodoList
            items={items}
            onItemCompleted={markItemCompleted}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </div>
      <form className="row">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            onChange={handleTextChange}
            value={text}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={handleAddItem}
            disabled={!text}
          >
            {"Add #" + (items.length + 1)}
          </button>
        </div>
      </form>
    </div>
  );
}

function TodoItem(props) {
  const _listItem = useRef();

  React.useEffect(() => {
    // if (_listItem) {
    //   // 1. Add highlight class.
    //   _listItem.classList.add("highlight");
    //   // 2. Set timeout.
    //   setTimeout(
    //     (listItem) => {
    //       // 3. Remove highlight class.
    //       listItem.classList.remove("highlight");
    //     },
    //     500,
    //     _listItem
    //   );
    // }
  }, []);

  const markCompleted = (event) => {
    props.onItemCompleted(props.id);
  };

  const deleteItem = (event) => {
    props.onDeleteItem(props.id);
  };

  var itemClass =
    "form-check todoitem " + (props.completed ? "done" : "undone");
  return (
    <li className={itemClass} ref={_listItem}>
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={markCompleted}
        />{" "}
        {props.text}
      </label>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={deleteItem}
      >
        x
      </button>
    </li>
  );
}

function TodoList(props) {
  return (
    <ul className="todolist">
      {props.items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.done}
          onItemCompleted={props.onItemCompleted}
          onDeleteItem={props.onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default App;
