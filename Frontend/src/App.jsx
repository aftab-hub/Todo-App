import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


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

const backendURL = "https://todoapp-btju.onrender.com"

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

      .post(`${backendURL}/user/create`, userData)
      .then(() => {
        toast.success("User created successfully");
        setToggle(false);
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
      .get(`${backendURL}/user/getAll`)

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
      .delete(`${backendURL}/user/delete/${id}`)
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
    setToggle(true)
  
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = editData;
     console.log("updatedData", updatedData);
    console.log("fetchData at update --------", fetchData);
    axios
      .put(`${backendURL}/user/update/${updatedData._id}`, {

        name: userData.name ? userData.name : updatedData.name,
        email: userData.email ? userData.email : updatedData.email,
        password: userData.password ? userData.password : updatedData.password,
        number: userData.number ? userData.number : updatedData.number,
      })
      .then((res) => {
        setToggle(false);
        setIsEdit(false);
     
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
  { toggle ? (

     <div className="max-w-4xl mx-auto my-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-xl">
      <div className="flex flex-row justify-between">
       <div>
        <h3 className="text-3xl font-bold text-indigo-600 mb-6 ">
          {isEdit ? " Edit User" : "Create User"}
        </h3>

       </div>
         <div>
         <button className="text-3xl font-semibold cursor-pointer text-indigo-500 hover:text-indigo-700" onClick={()=>setToggle(false)}><RxCross2/> </button>
       </div>

      </div>
  <form className="space-y-4 ">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div>
        <label className="block text-sm font-semibold text-gray-600">Name</label>
        <input
          id="name"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          type="text"
          defaultValue={isEdit ? editData.name : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Email</label>
        <input
          id="email"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          type="email"
          defaultValue={isEdit ? editData.email : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Password</label>
        <input
          id="password"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          type="password"
          defaultValue={isEdit ? editData.password : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Number</label>
        <input
          id="number"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          type="text"
          defaultValue={isEdit ? editData.number : ""}
          onChange={(e) => handleInput(e)}
        />
      </div>
    </div>

    <div className="mt-6 text-center">
      {isEdit ? (
        <button
          className="px-8 py-3 bg-indigo-500 cursor-pointer text-white rounded-lg hover:bg-indigo-600 shadow-md transition"
          type="submit"
          onClick={(e) => handleUpdate(e)}
        >
           Save Changes
        </button>
      ) : (
        <button
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  </form>
   </div>
  )
 :

(
  <>
    {/* User List Section */}

    <div className="max-w-6xl mx-auto my-8 ">

      <div className="flex flex-row justify-between bg-indigo-600 items-center p-3 rounded-xl mb-5">
        <div>
          <h2 className="text-3xl mx-5 font-bold text-white flex items-center gap-2 ">
            User List
          </h2>
        </div>
        <div>
          <button className="p-3 bg-white font-semibold text-black rounded-xl cursor-pointer hover:text-indigo-700" onClick={()=>setToggle(true)}>Add New +</button>
        </div>
      </div>

      {fetchData.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Password</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fetchData.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 truncate">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 truncate">{user.email}</td>
                  <td className="px-6 py-4">{user.number}</td>
                  <td className="px-6 py-4 text-gray-400 truncate">
                    {user.password}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      className="cursor-pointer flex items-center gap-1 px-3 py-2 text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                      onClick={() => handleEdit(user, index)}
                    >
                      <MdOutlineEdit size={18} /> 
                    </button>
                    <button
                      className="cursor-pointer flex items-center gap-1 px-3 py-2 text-red-600 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition"
                      onClick={() => handleDelete(user)}
                    >
                      <MdDeleteOutline size={18} /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-red-500 font-bold text-xl mt-10">
          🚫 No Record Found!
        </h1>
      )}
    </div>
  </>
)

}






      <Toaster />
    </>
  );
};

export default FormUsers;
