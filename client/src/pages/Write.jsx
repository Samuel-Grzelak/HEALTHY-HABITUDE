import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {axiosInstance} from "../config.js";


const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axiosInstance.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axiosInstance.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "fitness"}
              name="cat"
              value="fitness"
              id="fitness"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="fitness">Fitness</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "mindfulness"}
              name="cat"
              value="mindfulness"
              id="mindfulness"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="mindfulness">Mindfulness</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "nutrition"}
              name="cat"
              value="nutrition"
              id="nutrition"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="nutrition">Nutrition</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "recipes"}
              name="cat"
              value="recipes"
              id="recipes"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="recipes">Recipes</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "inspirational"}
              name="cat"
              value="inspirational"
              id="inspirational"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="inspirational">Inspirational</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
