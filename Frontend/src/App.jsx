import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const data = {
  name: null,
  email: null,
  password: null,
  number: null,
};

const FormUsers = () => {
  const [userData, setUserData] = useState(data);
  const [fetchData, setFetchData] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);


  const handleInput = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    await axios
      .post('http://localhost:8888/user/create', userData)
      .then(() => {
        toast.success("User created successfully");
        setToggle(!toggle);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("number").value = "";
  };

  const getData = async () => {
  await axios
      .get('http://localhost:8888/user/getAll')
      .then((res) => {
        setFetchData(res?.data.result); 
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  

  const handleDelete = async (item) => {
    const id = item._id

    
    await axios
      .delete(`http://localhost:8888/user/delete/${id}`)
      .then(() => {
        toast.error('User deleted successfully');
        setToggle(!toggle);
      
    console.log("id", id);


      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEdit = (item, index) => {
    
    console.log("fetch data", fetchData[index]);
    setIsEdit(!isEdit);
    console.log("item", item);
    setEditData(item);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = editData;
console.log("updatedData", updatedData);
    console.log("fetchData at update --------", fetchData);
    axios
      .put(`http://localhost:8888/user/update/${updatedData._id}`, {
        name: userData.name ? userData.name : updatedData.name,
        email: userData.email ? userData.email : updatedData.email,
        password: userData.password ? userData.password : updatedData.password,
        number: userData.number ? userData.number : updatedData.number,
      })
      .then((res) => {
        setToggle(!toggle);
        setIsEdit(!isEdit);
        toast.success('User updated successfully');
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("number").value = "";
  };

  useEffect(() => {
    getData();
  }, [toggle]);

  return (
    <>
 <div className="max-w-4xl mx-auto my-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-xl">
  <h3 className="text-3xl font-bold text-blue-600 mb-6 text-center">
    {isEdit ? "✏️ Edit User" : "📝 User Signup"}
  </h3>

  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-600">Name</label>
        <input
          id="name"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          defaultValue={isEdit ? editData.name : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Email</label>
        <input
          id="email"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="email"
          defaultValue={isEdit ? editData.email : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Password</label>
        <input
          id="password"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="password"
          defaultValue={isEdit ? editData.password : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Number</label>
        <input
          id="number"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          defaultValue={isEdit ? editData.number : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>
    </div>

    <div className="mt-6 text-center">
      {isEdit ? (
        <button
          className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-md transition"
          type="submit"
          onClick={(e) => handleUpdate(e)}
        >
          💾 Save Changes
        </button>
      ) : (
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
          type="submit"
          onClick={handleSubmit}
        >
          🚀 Submit
        </button>
      )}
    </div>
  </form>
</div>

{/* User List Section */}

<div className="max-w-6xl mx-auto my-5">
  <h2 className="text-2xl font-bold text-gray-700 mb-4">👥 User List</h2>

  {fetchData.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2">
      {fetchData.map((user, index) => (
        <div
          key={user._id}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
        >
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 break-words truncate">{user.email}</p>
          <p className="text-sm text-gray-500">📱 {user.number}</p>
          <p className="text-sm text-gray-400 truncate">🔑 {user.password}</p>

          <div className="mt-4 flex  gap-3">
            <button
              className="flex items-center gap-1 px-3 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
              onClick={() => handleEdit(user, index)}
            >
              <MdOutlineEdit size={18} /> Edit
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition"
              onClick={() => handleDelete(user)}
            >
              <MdDeleteOutline size={18} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <h1 className="text-center text-red-500 font-bold text-xl">
      No Record Found!
    </h1>
  )}
</div>



      <Toaster />
    </>
  );
};

export default FormUsers;