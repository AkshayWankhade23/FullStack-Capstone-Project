import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../Assets/image 466.png";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        mobile,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registerd Successfully! Welcome..");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="left_container">
        <h3 className="span_1">Create an account</h3>
        <div className="span_2">Your personal job finder is here</div> <br />
        <form onSubmit={registerUser}>
          <input
            placeholder="Name"
            type="text"
            value={data.name}
            className="input name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />{" "}
          <br />
          <input
            placeholder="Email"
            type="email"
            value={data.email}
            className="input email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />{" "}
          <br />
          <input
            placeholder="Mobile"
            type="text"
            value={data.mobile}
            className="input mobile"
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
          />{" "}
          <br />
          <input
            placeholder="Password"
            type="password"
            value={data.password}
            className="input password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />{" "}
          <br />
          <input type="checkbox" className="checkbox" />
          <span className="span_3">
            By creating an account, I agree to our terms of use and privacy
            policy
          </span>{" "}
          <br />
          <button className="create" type="submit">
            Create Account
          </button>{" "}
          <br />
          <span className="span_2">Already have an account?</span>
          <Link className="signIn" to="/Login">
            Sign In
          </Link>
        </form>
      </div>
      <div className="right_container">
        <img src={backgroundImg} alt="background_image" />
      </div>
    </div>
  );
}
