import React from "react";
import Header from "../Components/Header";
// import {Link} from "react-router-dom";
import Card from "../Components/Card";
import style from "../Pages/Home.module.css";
import searchIcon from "../Assets/Vector.svg";

export default function Home() {
  return (
    <div className={style.container}>
      <div>
        <Header />
      </div>
      <div className={style.finder}>
        <div className={style.input_skills}>
          <img src={searchIcon} alt="search_icon" />
          <input
            type="search"
            placeholder="Type any job title"
            className={style.search}
          />
        </div>
        <button className={style.add_job}>+ Add Job</button>
        <br />
        {/* <label for="skills">Skills</label> */}
        <select className={style.skills} id="skills" name="skills">
          <option value="Skills">Skills</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
        </select>
        <button className={style.clear}>Clear</button>
      </div>
      <div>
        {" "}
        <Card />{" "}
      </div>
    </div>
  );
}
