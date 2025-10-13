import React from 'react';
import toast from 'react-hot-toast';
import API from '../services/Api';

const CreateTodo = ({
  setTodos,
  handleInput,
  handleCreate,
  formData,
  setFormData,
  isEdit,
  setIsEdit,
  editData,
  setEditData
}) => {

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editData) return;

    try {
      await API.put(`/todo/update/${editData._id}`, formData);
      toast.success("Todo updated successfully ✅");

      setTodos(prev =>
        prev.map(todo =>
          todo._id === editData._id ? { ...todo, ...formData } : todo
        )
      );

      setIsEdit(false);
      setEditData(null);
      setFormData({ title: "", description: "", dueDate: "", dueTime: "", status: false });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating todo ❌");
      console.log(err.message);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <form
        className="flex flex-col gap-4 sm:gap-5"
        onSubmit={isEdit ? handleUpdate : handleCreate}
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleInput}
          placeholder="Title"
          className="w-full p-3 border border-indigo-400 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInput}
          placeholder="Description"
          className="w-full p-3 border border-indigo-400 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          rows={3}
        />

        {/* Date and Time Inputs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleInput}
            className="w-full sm:w-1/2 p-3 border border-indigo-400 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="time"
            name="dueTime"
            value={formData.dueTime || ""}
            onChange={handleInput}
            className="w-full sm:w-1/2 p-3 border border-indigo-400 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-40 cursor-pointer self-end bg-indigo-500 text-white py-3 px-5 rounded-lg hover:bg-indigo-600 transition"
        >
          {isEdit ? "Update Todo" : "Add Todo +"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
