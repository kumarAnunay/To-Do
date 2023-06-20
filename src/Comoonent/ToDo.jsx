import { useState, useEffect } from "react";
import "../App.css";

const ToDo = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const valueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const listHandler = () => {
    if (inputValue !== "") {
      const updatedList = [...list, inputValue];
      setList(updatedList);
      saveListToLocalStorage(updatedList);
    }
    setInputValue("");
  };

  const editHandler = (index) => {
    const editValue = prompt("Enter new list item");
    const editedList = [...list];
    editedList[index] = editValue;

    if (editValue) {
      setList(editedList);
      saveListToLocalStorage(editedList);
    }
  };

  const deleteHandler = (index) => {
    const updatedList = list.filter((item, i) => i !== index);
    setList(updatedList);
    saveListToLocalStorage(updatedList);
  };

  const saveListToLocalStorage = (updatedList) => {
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  const retrieveListFromLocalStorage = () => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  };

  useEffect(() => {
    retrieveListFromLocalStorage();
  }, []);

  return (
    <>
      <input type="text" id="text" value={inputValue} onChange={valueHandler} />
      <br />
      <button className="btn" onClick={listHandler}>
        Add to List
      </button>
      <br />
      <hr />
      <br />
      {list.length > 0 && (
        <div>
          <h1>List: </h1>
          <ul>
            {list.map((item, index) => {
              return (
                <div className="listContainer" key={index}>
                  <li>{item}</li>
                  <button className="bttn" onClick={() => editHandler(index)}>
                    Edit
                  </button>
                  <button className="bttn" onClick={() => deleteHandler(index)}>
                    Delete
                  </button>
                  <hr />
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export { ToDo };
