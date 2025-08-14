import { useState } from "react";
import { makeRequest } from "../../axios";
import "./addStory.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddStory = ({ setOpenAddStory }) => {
  const [file, setFile] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error adding story:", error);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image for your story!");
      return;
    }

    try {
      const imgUrl = await upload(file);
      mutation.mutate({ img: imgUrl });
      setOpenAddStory(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <div className="addStory">
      <div className="wrapper">
        <h1>Add Your Story</h1>
        <form>
          <div className="file">
            <label htmlFor="file">
              <span>Choose Image</span>
              <div className="imgContainer">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="" />
                ) : (
                  <div className="placeholder">
                    <CloudUploadIcon className="icon" />
                    <span>Click to upload image</span>
                  </div>
                )}
              </div>
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="buttons">
            <button type="button" onClick={handleClick} disabled={!file}>
              Add Story
            </button>
            <button type="button" className="cancel" onClick={() => setOpenAddStory(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStory;