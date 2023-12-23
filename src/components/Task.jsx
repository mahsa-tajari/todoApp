import "../styles/tasks.css";
export default function Task({ data, onClick, onEditTodo }) {
  return (
    <div
      onClick={() => onEditTodo(data)}
      className={data.finished ? "task finished-task" : "task"}
      style={{
        backgroundColor: `rgb(${data.selectedColor.r},${data.selectedColor.g},${data.selectedColor.b})`,
      }}
    >
      <div className="task-holder">
        <h3>{data.task}</h3>
        <div className="categories-holder">
          {data.categories.map((category) => (
            <span
              key={category.name}
              style={{
                backgroundColor: `rgba(${data.selectedColor.r + 5},${
                  data.selectedColor.g + 4
                },${data.selectedColor.b + 5}, 0.5)`,
              }}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <span onClick={() => onClick(data.id)}>x</span>
    </div>
  );
}
