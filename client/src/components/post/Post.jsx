import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);

  //Get likes
  const {
    error: likedError,
    isLoading: LikedLoading,
    data: liked,
  } = useQuery({
    queryKey: ["likes", post.id], // Include postId in the query key -- otherwise different post has same comments from last requirment
    queryFn: () =>
      makeRequest.get(`/likes?postId=${post.id}`).then((res) => {
        return res.data;
      }),
  });
  if (likedError) {
    console.log("Error occurred when geting likes:", likedError);
  }

  //Get comments count
  const {
    error: commentsError,
    isLoading: commentsLoading,
    data: comments,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(`/comments?postId=${post.id}`).then((res) => res.data),
  });
  if (commentsError) {
    console.log("Error occurred when getting comments:", commentsError);
  }

  const queryClient = useQueryClient();
  // use useMutation to deal with updating like
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makeRequest.delete(`/likes/${post.id}`);
      }
      return makeRequest.post(`/likes`, { postId: post.id });
    },
    onSuccess: () => {
      // Refresh likes data after success
      queryClient.invalidateQueries({
        queryKey: ["likes", post.id],
        exact: true,
      });
    },
    onError: (error) => {
      // Error handling
      console.error("Error creating post:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return makeRequest.delete(`/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Error deleting post:", err);
    },
  });

  const handleLiked = () => {
    mutation.mutate(liked.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <Link
            to={`/profile/${post.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="userInfo">
              <img src={post.profilePic ? `http://www.milanet.homes/uploads/${post.profilePic}` : "/imgs/profilePic.png"} alt="" />
              <div className="details">
                <span className="name">{post.name}</span>

                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
          </Link>
          <div className="right">
            {postOpen && post.userId === currentUser.id && (
              <button onClick={handleDelete}>DELETE</button>
            )}
            {postOpen ? (
              <MoreVertIcon onClick={() => setPostOpen(!postOpen)} />
            ) : (
              <MoreHorizIcon onClick={() => setPostOpen(!postOpen)} />
            )}
          </div>
        </div>
        <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="content">
            <p>{post.desc}</p>
            <img src={post.img ? `http://www.milanet.homes/uploads/${post.img}` : ""} alt="" />
          </div>
        </Link>
        <div className="info">
          <div className="item" onClick={handleLiked}>
            {likedError
              ? "Error occurred when geting likes"
              : LikedLoading
              ? "Loading..."
              : liked &&
                (liked.includes(currentUser.id) ? (
                  <FavoriteOutlinedIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                ))}
            {liked && liked.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsError
              ? "Error loading comments"
              : commentsLoading
              ? "Loading..."
              : comments
              ? `${comments.length} Comments`
              : "0 Comments"}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
