import React from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import API from "../services/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TodoListing = ({ todos, setTodos, fetchTodos, handleEdit }) => {
  const navigate = useNavigate();

  const handleDelete = async (item) => {
    const id = item._id || item.id;
    if (!id) return toast.error("No ID found for this todo");

    try {
      await API.delete(`/todo/delete/${id}`);
      toast.success("Todo deleted successfully ✅");
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      fetchTodos();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting todo ❌");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await API.put(`/todo/status/${id}`);
      toast.success(
        res.data.todo.status
          ? "Task completed ✅"
          : "Task marked incomplete ⚠️"
      );
      fetchTodos();
    } catch (err) {
      toast.error("Error updating status ❌");
    }
  };

  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
      {todos?.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex flex-col justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top section: Checkbox + Details */}
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={todo.status}
                onChange={(e) => {
                  e.stopPropagation(); // prevent navigating to details
                  handleToggle(todo._id);
                }}
                className="w-6 h-6 accent-indigo-500 cursor-pointer mt-1"
              />
              <div className="flex-1">
                <h2
                  className={`font-semibold text-lg ${
                    todo.status ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h2>
                <p
                  className={`text-gray-600 text-sm mt-1 ${
                    todo.status ? "line-through" : ""
                  }`}
                >
                  {todo.description || "No description provided."}
                </p>

                {/* Combine date and time in one line */}
               
                  {todo.dueDate && todo.dueTime && 
                 
                  <p className="text-xs text-gray-500 mt-1">
                  Due: {todo.dueDate || "No date"}{" "}
                  {todo.dueTime ? `at ${todo.dueTime}` : ""}
                </p>
              
                }

              </div>

              {/* Details Button */}
              <button
                onClick={() => navigate(`/todo/${todo._id}`)}
                className="p-2 bg-indigo-500 text-sm text-white rounded-lg cursor-pointer transition ml-2"
                title="Details"
              >
                Details
              </button>
            </div>

            {/* Status + Edit/Delete */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  todo.status
                    ? "bg-green-100 text-green-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {todo.status ? "Completed" : "Pending"}
              </span>

              <div className="flex gap-3" >
                <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(todo); }}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition cursor-pointer"
                  title="Edit"
                >
                  <MdOutlineEdit size={20} />
                </button>
                <button
                 onClick={(e) => { e.stopPropagation(); handleDelete(todo); }}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition cursor-pointer"
                  title="Delete"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
       <div className="ml-100 w-full">
         <h1 className="text-center  text-gray-500 font-medium text-lg sm:text-xl mt-10">
          🚫 No todos found — start by adding one!
        </h1>
       </div>
      )}
    </div>
  );
};

export default TodoListing;
