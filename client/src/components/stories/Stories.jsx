import { useContext, useState } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddStory from "../addStory/AddStory";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [openAddStory, setOpenAddStory] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      makeRequest.get("/stories").then((res) => {
        return res.data;
      }),
  });

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic ? `http://www.milanet.homes/uploads/${currentUser.profilePic}` : "/imgs/profilePic.png"} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenAddStory(true)}>+</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img ? `http://www.milanet.homes/uploads/${story.img}` : "/imgs/profilePic.png"} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
      {openAddStory && <AddStory setOpenAddStory={setOpenAddStory} />}
    </div>
  );
};

export default Stories;
