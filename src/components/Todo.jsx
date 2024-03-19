import { useState, useEffect } from "react";

const getLocalStorageTodos = () => {
  const todos = localStorage.getItem("Todos");

  if (!todos) {
    return [];
  } else {
    return JSON.parse(todos);
  }
};

const Todo = () => {
  const [todos, setTodos] = useState(getLocalStorageTodos());
  const [todo, setTodo] = useState("");

  const handleAddToTodo = (e) => {
    e.preventDefault();

    setTodos((prev) => {
      return [...prev, todo];
    });

    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.filter((_, idx) => {
        return idx !== id;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="grid w-full h-screen bg-zinc-900 place-items-center">
      <div className="w-[350px] h-[500px] bg-zinc-800 rounded-xl">
        <div className="w-full p-5 ">
          <form onSubmit={handleAddToTodo} className="flex">
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              type="text"
              placeholder="Enter A Todo"
              className="w-full p-3 bg-transparent border rounded outline-none text-zinc-400 border-zinc-700"
            />
            <button
              type="submit"
              className="p-3 ml-2 rounded text-zinc-100 bg-zinc-600"
            >
              Add
            </button>
          </form>
        </div>
        <div className="w-full p-3">
          <ol className="ml-6 space-y-2 font-sans text-white list-decimal">
            {todos.map((todo, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-zinc-700"
                >
                  <li>{todo}</li>
                  <button
                    onClick={() => handleDeleteTodo(idx)}
                    className="px-4 py-2 mb-2 rounded bg-zinc-600"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Todo;
