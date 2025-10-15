import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/Api";
import toast from "react-hot-toast";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

useEffect(() => {
  const fetchTodo = async () => {
    try {
      const res = await API.get(`/todo/get/${id}`);
    
      
      setTodo(res?.data?.todo); // now todo will not be undefined
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching todo");
    }
  };
  fetchTodo();
}, [id]);


  if (!todo) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="bg-white w-full max-w-3xl shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          {todo.title}
        </h1>
        <p className="text-gray-700 mb-6">{todo.description}</p>
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-6">
          <p><span className="font-semibold">Status:</span> {todo.status ? "✅ Completed" : "⏳ Pending"}</p>
          
            {todo.dueDate && todo.dueTime && 
                  <p className="text-xs text-gray-500 mt-1">
                  Due: {todo.dueDate || "No date"}{" "}
                  {todo.dueTime ? `at ${todo.dueTime}` : ""}
                </p>
              }

        </div>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
