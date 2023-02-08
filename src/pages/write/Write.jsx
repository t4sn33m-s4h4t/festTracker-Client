
import React from 'react';
import { useContext, useEffect, useRef, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

import TextEditor from '../../components/textEditor/textEditor';


export default function Write() {
  



  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [host, setHost] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);
  const handleCheckboxChange = (categoryName) => {
    console.log(selectedCategories);
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((catName) => catName !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      fbLink,
      address,
      startTime,
      endTime,
      host,
      selectedCategories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/Categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  
  // ckeditor


  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <div className="nameAndImg">
            <div className="postImage">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="eventName">
              <input
                type="text"
                placeholder="Event Name"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="hostName">
            <input
              type="text"
              placeholder="Host Name"
              autoFocus={true}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
          <div className="category">
            <p>Select Categories:</p>
            <div className="catCheckBoxes">
              {categories.map((category) => (
                <div key={category._id}>
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCheckboxChange(category.name)}
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="place">
            <input
              type="text"
              placeholder="Event Address"
              autoFocus={true}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="fbEvent">
            <input
              type="text"
              placeholder="FB Event Link"
              autoFocus={true}
              onChange={(e) => setFbLink(e.target.value)}
            />
          </div>
          <div className="time">
            <div className="timeLabel">
              <p>From:</p>
              <input
                type="date"
                autoFocus={true}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="timeLabel">
              <p>To:</p>
              <input
                type="date"
                autoFocus={true}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="writeFormGroup">
        
        {/* <TextEditor /> */}
        <textarea className='writeText'
      value={desc}
      onChange={(e)=>{setDesc(e.target.value)}}
      
    />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
</form>
    </div> 
  );
}
