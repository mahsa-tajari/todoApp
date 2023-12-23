import { useState } from "react";
import "../styles/tasks.css";
import Task from "./Task";
import Button from "./Button";
import TodoForm from "./TodoForm";
import { useKey } from "../custom Hooks/useKey";
export default function Tasks({ activeDate }) {
  const [tasks, setTasks] = useState([]);
  const [addTodoForm, setAddTodoForm] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editTodoForm, setEditTodoForm] = useState(false);

  useKey("Escape", function () {
    if (editTodo) setEditTodo(false);
  });

  function addTodoHandler() {
    setAddTodoForm((prev) => !prev);
  }

  function createTodo(newTask) {
    newTask.createdAt = activeDate.day;
    setTasks((tasks) => [...tasks, newTask]);
  }

  function deleteTodoHandler(id) {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  }

  function editTodoHandler(data) {
    if (selectedTodo && data.id !== selectedTodo.id) {
      setSelectedTodo(data);
      setEditTodo(true);
    } else {
      setSelectedTodo(data);
      setEditTodo((prev) => !prev);
    }
  }

  function finishingTodoHandler() {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === selectedTodo.id
          ? { ...item, finished: !item.finished }
          : item
      )
    );
    setSelectedTodo((todo) => ({ ...todo, finished: !todo.finished }));
    sortTasks();
  }
  function sortTasks() {
    setTasks((tasks) => [
      ...tasks,
      tasks.map((item) =>
        item.finished
          ? tasks.push(tasks.splice(tasks.indexOf(item), 1)[0])
          : tasks
      ),
    ]);
  }

  function openEditTodoFormHandler() {
    setEditTodoForm((prev) => !prev);
  }

  function saveChangesHandler(editedTask) {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === editedTask.id
          ? {
              ...item,
              task: editedTask.task,
              selectedColor: editedTask.selectedColor,
              categories: editedTask.categories,
            }
          : item
      )
    );
    setSelectedTodo(null);
    setEditTodo(false);
  }

  return (
    <section className="tasks-section">
      <div className="tasks-day-wrapper">
        <span className="tasks-day">
          {activeDate.day === new Date().getDate() && (
            <span className="current-date">Today </span>
          )}
          {activeDate.weekDay} - {activeDate.month} {activeDate.day}
        </span>
        <Button
          action={addTodoHandler}
          color={"#fff"}
          backgroundColor={"#ff4c8e"}
          border={"none"}
          fontSize={"1rem"}
          padding={".2rem .5rem"}
          cursor={"pointer"}
          hoverBackground={"#fc3e83"}
        >
          +
        </Button>
      </div>
      <div className="tasks">
        {tasks.map((task, index) =>
          task.createdAt === activeDate.day ? (
            <Task
              key={index}
              data={task}
              onClick={deleteTodoHandler}
              onEditTodo={editTodoHandler}
            ></Task>
          ) : (
            <></>
          )
        )}
      </div>
      <div className={editTodo ? "edit-task edit-task--show" : "edit-task"}>
        <Button
          padding={".6rem"}
          width={"30%"}
          backgroundColor={"#fff"}
          borderRadius={".5rem"}
          cursor={selectedTodo?.finished ? "not-allowed" : "pointer"}
          fontWeight={"bold"}
          action={openEditTodoFormHandler}
          disabled={false}
        >
          Edit
        </Button>
        <Button
          padding={".6rem"}
          width={"70%"}
          backgroundColor={"#FFD388"}
          borderRadius={".5rem"}
          cursor={"pointer"}
          fontWeight={"bold"}
          color={"#000"}
          hoverBackground={"#FEC37D"}
          height={"2.5rem"}
          action={finishingTodoHandler}
        >
          {selectedTodo?.finished ? "Undone" : "Done ✔"}
        </Button>
      </div>
      {addTodoForm && (
        <TodoForm onClick={addTodoHandler} onAddTodo={createTodo}>
          Add
        </TodoForm>
      )}
      {editTodoForm && (
        <TodoForm
          onClick={openEditTodoFormHandler}
          onAddTodo={saveChangesHandler}
          data={selectedTodo}
        >
          Save
        </TodoForm>
      )}
      {addTodoForm || editTodoForm ? (
        <div
          className="over-lay"
          onClick={() => {
            setEditTodoForm(false), setAddTodoForm(false);
          }}
        ></div>
      ) : (
        ""
      )}
    </section>
  );
}
