import { useEffect, useRef, useState } from "react";
import "../styles/todoForm.css";
import Button from "./Button";
import { useKey } from "../custom Hooks/useKey";
export default function TodoForm({ onClick, onAddTodo, data, children }) {
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState(
    data ? data.categories : [{ id: 1, name: "Job" }]
  );
  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    data
      ? data.selectedColor
      : {
          r: "177",
          g: "243",
          b: "222",
        }
  );
  const [newTodo, setNewTodo] = useState(data ? data.task : "");
  const colors = [
    { name: "specialGreen", r: "177", g: "243", b: "222" },
    { name: "white", r: "255", g: "255", b: "255" },
    { name: "gray2", r: "107", g: "114", b: "128" },
    { name: "red", r: "220", g: "38", b: "38" },
    { name: "red2", r: "185", g: "28", b: "28" },
    { name: "Yellow", r: "251", g: "191", b: "36" },
    { name: "Yellow2", r: "245", g: "158", b: "11" },
    { name: "brown", r: "146", g: "64", b: "14" },
    { name: "brown2", r: "180", g: "83", b: "9" },
    { name: "Green", r: "16", g: "185", b: "129" },
    { name: "Green2", r: "4", g: "120", b: "87" },
    { name: "Blue", r: "37", g: "99", b: "235" },
    { name: "Indigo", r: "67", g: "56", b: "202" },
    { name: "Purple", r: "109", g: "40", b: "217" },
    { name: "Pink", r: "244", g: "114", b: "182" },
    { name: "Pink2", r: "236", g: "72", b: "153" },
  ];

  const inputTodo = useRef(null);
  const categoryInput = useRef(null);

  useEffect(
    function () {
      inputTodo.current.focus();
      if (addCategory) categoryInput.current.focus();
    },
    [addCategory]
  );

  useKey("Escape", onClick);
  useKey("Enter", function () {
    if (document.activeElement !== categoryInput.current) createTodoHandler();
    else addCategoryHandler();
  });

  function addCategoryHandler() {
    if (!addCategory) setAddCategory(true);
    else {
      if (!newCategory) return;
      const categoryItem = {
        id: categories.length + 1,
        name: newCategory.trim(),
      };
      setCategories([...categories, categoryItem]);
      setNewCategory("");
    }
  }

  function deleteCategoryHandler(id) {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  }

  function createTodoHandler() {
    if (!newTodo) return;
    const newItem = {
      task: newTodo,
      categories,
      selectedColor,
      finished: false,
      id: data ? data.id : new Date().getSeconds(),
    };
    onAddTodo(newItem);
    onClick();
  }

  return (
    <div className="add-todo-wrapper">
      <div className="add-todo-input-wrapper">
        <h3>{data ? "Edit Task" : "Create a task"}</h3>
        <input
          className="add-todo-input"
          type="text"
          placeholder="Your task"
          value={newTodo}
          onChange={() => setNewTodo(inputTodo.current.value)}
          ref={inputTodo}
        />
      </div>
      <div className="add-todo-category">
        <h3>Category</h3>
        <span className="alert">
          To delete any category, double click on it.
        </span>
        <ul className="categories-wrapper">
          {categories.map((category) => (
            <li
              key={category.name}
              className="category-item"
              onDoubleClick={() => deleteCategoryHandler(category.id)}
            >
              {category.name}
            </li>
          ))}
          <Button
            color={newCategory ? "#059669" : "#000"}
            backgroundColor={"#FEC37D"}
            border={"2px solid #000"}
            fontSize={"1rem"}
            padding={".2rem .5rem"}
            cursor={"pointer"}
            borderRadius={".5rem"}
            hoverBackground={"#fab96a"}
            action={addCategoryHandler}
          >
            {newCategory ? "✔" : "+"}
          </Button>
        </ul>
        {addCategory ? (
          <input
            className="add-todo-input"
            type="text"
            placeholder="Create category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            ref={categoryInput}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="add-todo-colors">
        <h3>Colors</h3>
        <div className="colors">
          {colors.map((color) => (
            <span
              className={
                `rgb(${selectedColor.r},${selectedColor.g},${selectedColor.b})` ===
                `rgb(${color.r},${color.g},${color.b})`
                  ? "active"
                  : ""
              }
              key={color.name}
              style={{
                backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                display: "block",
                borderRadius: "100%",
                width: "1rem",
                height: "1rem",
                cursor: "pointer",
                border: "2px solid transparent",
              }}
              onClick={() =>
                setSelectedColor({ r: color.r, g: color.g, b: color.b })
              }
            ></span>
          ))}
        </div>
      </div>
      <Button
        padding={".6rem"}
        width={"40%"}
        backgroundColor={"#FEC37D"}
        borderRadius={".5rem"}
        cursor={"pointer"}
        fontWeight={"bold"}
        color={"#000"}
        margin={"0 auto"}
        hoverBackground={"#fab96a"}
        action={createTodoHandler}
      >
        {children}
      </Button>
      <Button
        color={"#ff4c8e"}
        backgroundColor={"transparent"}
        border={"none"}
        fontSize={"1rem"}
        fontWeight={"bold"}
        cursor={"pointer"}
        borderRadius={".5rem"}
        position={"absolute"}
        right={".5rem"}
        hoverBackground={"transparent"}
        action={onClick}
      >
        x
      </Button>
    </div>
  );
}
