import { useEffect, useState } from "react";

import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./running.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function RunningFest() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/running");
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
    
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
