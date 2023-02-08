
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./admin.css";
import { Context } from "../../context/Context";
const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [addCat, setAddCat] = useState("");
  

  const { user } = useContext(Context);
// Add Category 
const handleAddCategory = async (e) => {
  e.preventDefault();
  let found = categories.find(obj => obj.name === addCat);
  if (addCat && !found ) {
      
      
    try {
      
      axios.post("http://localhost:5000/api/Categories", { name: addCat })
        .then((res) => {
          setCategories([...categories, res.data]);
        });
        setAddCat('')
    } catch (error) {
      console.log(error);
    }
  }
};
// Delete Category
const deleteCategory = async(id) =>{
  console.log(999)
  try {
    const response = await axios.delete(`http://localhost:5000/api/Categories/${id}`);
    const newcategories = categories.filter(function (cat) {
      return cat._id !== id;
    });
    console.log(newcategories)
    setCategories(newcategories)
  } catch (err) {
    console.error(err);
  }
}

// Delete User
const handleDeleteUser = async (userId) => {
  await axios.delete(`/api/users/${userId}`);
  setUsers(users.filter((user) => user._id !== userId));
};


// Delete Post 

const handleDeletePost = async (postId) => {
  try {
    await axios.delete(`/posts/${postId}`, {
      data: { username: user.username },
    });
    setPosts(posts.filter((post) => post._id !== postId));
    
  } catch (err) {}
};




  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await axios.get("/Categories");
      setCategories(categoriesResponse.data);

      const usersResponse = await axios.get("/users");
      setUsers(usersResponse.data);

      const postsResponse = await axios.get("/posts");
      setPosts(postsResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Add Category"
          value={addCat}
          onChange={(e) => setAddCat(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((category) => (
          <div  key={category._id} style={{ display: "flex" }}>
            <li>{category.name}</li>

            <i
              className="singlePostIcon far fa-trash-alt"
              onClick={()=>{deleteCategory(category._id)}}
            ></i>
          </div>
        ))}
      </ul>

      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Posts</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post._id}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
