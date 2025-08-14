import "./postDetail.scss";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Comments from "../../components/comments/Comments";
import moment from "moment";

const PostDetail = ({ post }) => {
  if (!post) {
    return (
      <div className="postDetail">
        <div className="container">
          <div className="error">
            <h2>Post Not Found</h2>
            <p>Sorry, this post doesn't exist or has been removed.</p>
            <Link to="/" className="backButton">
              <ArrowBackIcon />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="postDetail">
      <div className="container">
        <div className="header">
          <Link to="/" className="backButton">
            <ArrowBackIcon />
            Back to Home
          </Link>
          <h2>Post Details</h2>
        </div>
        
        <div className="postContent">
          <div className="postHeader">
            <Link
              to={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="userInfo">
                <img 
                  src={post.profilePic ? `http://www.milanet.homes/uploads/${post.profilePic}` : "/imgs/profilePic.png"} 
                  alt="" 
                />
                <div className="details">
                  <span className="name">{post.name}</span>
                  <span className="date">{moment(post.createdAt).fromNow()}</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="postBody">
            <p className="description">{post.desc}</p>
            {post.img && (
              <img 
                src={`http://www.milanet.homes/uploads/${post.img}`} 
                alt="Post content" 
                className="postImage"
              />
            )}
          </div>
        </div>
        
        <div className="commentsSection">
          <h3>Comments</h3>
          <Comments postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;