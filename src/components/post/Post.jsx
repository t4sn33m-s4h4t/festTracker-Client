import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
        
        {post.selectedCategories &&
            post.selectedCategories.map((c) => (
              <span className="postCat">{c}</span>
            ))}
        </span>
          
      </div>
      <div className="eventTiming">
        
      <p>From: {new Date(post.startTime).toDateString()}</p>
          <p>To: {new Date(post.endTime).toDateString()}</p>
      </div>
      
      
        
      
      <p className="postDesc">{post.desc.substring(0, 300)}...</p>
      <Link to={`/post/${post._id}`} className="linkButton">
      <div className="postBtn">
        See More
      </div>
        </Link>
      {/* <div className="reactions">
        <span>Like</span>
        <span>Dislike</span>
      </div> */}
    </div>
  );
}
