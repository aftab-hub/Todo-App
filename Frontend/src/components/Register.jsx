import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
 const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext); // get login function
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", formData);
      toast.success("Registration successful ✅");

      // save token in context -> triggers App re-render
      login(res.data.token); 

      // navigate to dashboard immediately
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white border p-5 rounded-xl w-100 py-10 border-gray-400 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-indigo-500 mb-3">Sign Up</h2>
        <input className="p-2 outline-indigo-400 border border-indigo-400 rounded" type="text" name="name" placeholder="Name" onChange={handleInput} value={formData.name} />
        <input className="p-2 outline-indigo-400 border border-indigo-400 rounded" type="email" name="email" placeholder="Email" onChange={handleInput} value={formData.email} />
        <input className="p-2 outline-indigo-400 border border-indigo-400 rounded" type="password" name="password" placeholder="Password" onChange={handleInput} value={formData.password} />
        <button className="bg-indigo-500 cursor-pointer text-white py-2 rounded mt-2 font-semibold">Sign up</button>
         <div>
          <p className="text-sm text-center text-gray-600">Already have an account!<span className="mx-1 font-bold cursor-pointer text-blue-600" onClick={(e)=>navigate('/login')}>Login</span> </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
