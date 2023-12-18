import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import backgroundImg from "../Assets/image 466.png";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="left_container">
        <form onSubmit={loginUser}>
          <h3 className="span_1 header">Already have an account?</h3>
          <div className="span_2">Your personal job finder is here</div> <br />
          <input
            placeholder="Email"
            type="email"
            className="input email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
          />{" "}
          <br />
          <input
            placeholder="Password"
            type="password"
            className="input password"
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
          />{" "}
          <br />
          <button className="create" type="submit">
            Sign in
          </button>{" "}
          <br />
          <span className="span_2">Don’t have an account?</span>
          <Link className="signIn" to="/">
            Sign Up
          </Link>
        </form>
      </div>
      <div className="right_container">
        <img src={backgroundImg} alt="" />
      </div>
    </div>
  );
}
