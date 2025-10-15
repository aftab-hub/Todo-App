import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
 const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", formData);
      toast.success("Login successful ✅");

      login(res.data.token); // save token in context
      navigate("/welcome");
    
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };


  return (
    <div className=" flex justify-center items-center h-screen bg-gray-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 border bg-white border-gray-400 shadow-2xl p-5 py-12 rounded-xl w-100">
        <h2 className="text-2xl text-center font-bold text-indigo-500 mb-3">Login</h2>
        <input className="p-2 outline-indigo-400 border border-indigo-400 rounded" type="email" name="email" placeholder="Email" onChange={handleInput} value={formData.email} />
        <input className="p-2 outline-indigo-400 border border-indigo-400 rounded" type="password" name="password" placeholder="Password" onChange={handleInput} value={formData.password} />
        <button className="bg-indigo-500  text-white py-2 cursor-pointer rounded mt-2 font-semibold">Login</button>
        <div>
          <p className="text-sm text-gray-600 text-center">Don't have an account!<span className="mx-1 font-bold cursor-pointer text-blue-600" onClick={(e)=>navigate('/')}>Sign Up</span> </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
