import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [shareComment, setShareComment] = useState("");
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ["comments", postId], // Include postId in the query key -- otherwise different post has same comments from last requirment
    queryFn: () =>
      makeRequest.get(`/comments?postId=${postId}`).then((res) => res.data),
  });
  if (error) {
    console.log("Error occurred:", error);
  }
  
  // Use useMutation to handle comment creation
  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      // Refresh comments data after success
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      // Error handling
      console.error("Error creating comment:", error);
    },
  });

  // Delete comment mutation
  const deleteMutation = useMutation({
    mutationFn: (commentId) => makeRequest.delete(`/comments/${commentId}`),
    onSuccess: () => {
      // Refresh comments data after success
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      // Error handling
      console.error("Error deleting comment:", error);
    },
  });
  
  const handleSend = (e) => {
    e.preventDefault();
    if (!shareComment.trim()) return; // Prevent sending empty comments
    
    mutation.mutate({ desc: shareComment, postId });
    setShareComment(""); // Clear description
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteMutation.mutate(commentId);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img 
          src={currentUser.profilePic ? `http://www.milanet.homes/uploads/${currentUser.profilePic}` : "/imgs/profilePic.png"} 
          alt="" 
        />
        <input
          type="text"
          placeholder="write a comment"
          name="sharecomment"
          value={shareComment}
          onChange={(e) => setShareComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
        />
        <button onClick={(e) => handleSend(e)} disabled={!shareComment.trim()}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : data &&
          data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img 
                src={comment.profilePic ? `http://www.milanet.homes/uploads/${comment.profilePic}` : "/imgs/profilePic.png"} 
                alt="" 
              />
              <div className="info">
                <div className="user-info">
                  <div className="time">
                      <span>{comment.name}</span>
                      <span className="date">
                        {moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                  </div>
                  {currentUser.id === comment.userId && (
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p>{comment.desc}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
