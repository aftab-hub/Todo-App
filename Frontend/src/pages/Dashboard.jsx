import React, { useEffect, useState } from "react";
import API from "../services/Api";
import TodoListing from "./TodoListing";
import CreateTodo from "./CreateTodo";
import toast, { Toaster } from "react-hot-toast";
import ProfileHeader from "../components/userProfile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showCreate, setShowCreate] = useState(false); // toggling createTodo component
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueTime: "",
    status: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();


  // Fetch user
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/me");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todo/get");
      setTodos(res.data.result);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching todos");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTodos();
  }, []);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post("/todo/create", formData);
      setFormData({ title: "", description: "", dueTime: "", status: false });
      toast.success("Todo created successfully ✅");
       setShowCreate(false)
       navigate("/dashboard");
      fetchTodos();

    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating todo");
    }
  };

 const handleEdit = (todo) => {
  setIsEdit(true);          // enter edit mode
  setEditData(todo);        // store todo to edit
  setFormData({             // pre-fill form with existing values
    title: todo.title,
    description: todo.description,
    dueTime: todo.dueTime || "", // include dueTime if you have it
    dueDate: todo.dueDate || "",       // include date if you have it
    status: todo.status || false
  });
  setShowCreate(true);      // make sure form is visible
};

const toggleCreate = () => {
  if (showCreate) {
    // Closing the form → reset edit state
    setIsEdit(false);
    setEditData(null);
    setFormData({ title: "", description: "", dueTime: "", date: "", status: false });
  }
  setShowCreate((prev) => !prev); // toggle visibility
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Todo App
          </h1>
          <ProfileHeader user={user} onLogout={handleLogout} />
        </div>

       {/* Toggle button */}
        <button
           onClick={toggleCreate}
          className="mb-4 px-4 py-2 bg-indigo-500 cursor-pointer text-white rounded-lg hover:bg-indigo-600 transition"
        >
          {showCreate ? "Close" : "Add Todo +"}
        </button>

        {/* Show form only when toggled */}
        {showCreate ? (
          <CreateTodo
            setTodos={setTodos}
            handleInput={handleInput}
            handleCreate={handleCreate}
            formData={formData}
            setFormData={setFormData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editData={editData}
            setEditData={setEditData}
            setShowCreate={setShowCreate}
          />
        ) 
        
        : 
        
       ( <div className="mb-10">
          <TodoListing
            todos={todos}
            setTodos={setTodos}
            fetchTodos={fetchTodos}
            handleEdit={handleEdit}
          />
        </div>)

        }

      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Dashboard;
