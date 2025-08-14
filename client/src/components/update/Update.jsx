import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const { updateUser } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
      // Update currentUser with uploaded image URLs
      updateUser({ ...texts, coverPic: variables.coverPic, profilePic: variables.profilePic });
      
      // Close popup and clear state after successful update
      setOpenUpdate(false);
      setCover(null);
      setProfile(null);
    },
    onError: (error) => {
      // Error handling
      console.error("Error updating:", error);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Wait for all image uploads to complete
      let coverUrl;
      let profileUrl;
      
      // If there's a new cover image, upload it
      if (cover) {
        coverUrl = await upload(cover);
      } else {
        coverUrl = user.coverPic;
      }
      
      // If there's a new profile image, upload it
      if (profile) {
        profileUrl = await upload(profile);
      } else {
        profileUrl = user.profilePic;
      }

      // Update user information after all images are uploaded
      mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
      
      // Only close popup and clear state after successful mutation
      // These operations are moved to mutation's onSuccess callback
    } catch (error) {
      console.error("Image upload failed:", error);
      // Error notification can be added here
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : user.coverPic ? `http://www.milanet.homes/uploads/${user.coverPic}` : "/imgs/coverPic.jpg"
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : user.profilePic ? `http://www.milanet.homes/uploads/${user.profilePic}` : "/imgs/profilePic.png"
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          x
        </button>
      </div>
    </div>
  );
};

export default Update;
