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
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/todo/:id"
          element={token ? <TodoDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
