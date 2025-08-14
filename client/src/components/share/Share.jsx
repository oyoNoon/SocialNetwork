import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useRef } from "react";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  // File upload function
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      // console.log(res);
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  // Use useMutation to handle post creation
  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      // Refresh posts data after success
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
    onError: (error) => {
      // Error handling
      console.error("Error creating post:", error);
    },
  });

  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload(); // Upload image and get image URL
    mutation.mutate({ desc, img: imgUrl }); // Submit new post
    setDesc(""); // Clear description
    setFile(null); // Clear file
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic ? `http://www.milanet.homes/uploads/${currentUser.profilePic}` : "/imgs/profilePic.png"} alt="" />
            <input
              type="text"
              value={desc}
              placeholder={`What's on your mind ----- ${currentUser.name}?`}
              onChange={handleChange} // Update description
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])} // Set file
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
