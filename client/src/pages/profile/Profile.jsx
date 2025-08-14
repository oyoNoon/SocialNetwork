import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const userId = parseInt(id);
  
  const queryClient = useQueryClient();

  // Clear related query cache when userId changes
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["relationship"] });
    queryClient.invalidateQueries({ queryKey: ["posts", userId] });
  }, [userId, queryClient]);

  const { error, isLoading, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });

  // Get user statistics
  const { isLoading: statsLoading, data: statsData } = useQuery({
    queryKey: ["userStats", userId],
    queryFn: () =>
      makeRequest.get("/users/stats/" + userId).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["relationship", userId],
        exact: true,
      });
      // Also refresh statistics data
      queryClient.invalidateQueries({
        queryKey: ["userStats", userId],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error following:", error);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic ? `http://www.milanet.homes/uploads/${data.coverPic}` : "/imgs/coverPic.jpg"} alt="" className="cover" />
            <img
              src={data.profilePic ? `http://www.milanet.homes/uploads/${data.profilePic}` : "/imgs/profilePic.png"}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="stats">
                  {statsLoading ? (
                    "Loading stats..."
                  ) : (
                    <>
                      <div className="stat">
                        <span className="number">{statsData?.posts || 0}</span>
                        <span className="label">posts</span>
                      </div>
                      <div className="stat">
                        <span className="number">{statsData?.followers || 0}</span>
                        <span className="label">fans</span>
                      </div>
                      <div className="stat">
                        <span className="number">{statsData?.following || 0}</span>
                        <span className="label">following</span>
                      </div>
                      <div className="stat">
                        <span className="number">{statsData?.totalLikes || 0}</span>
                        <span className="label">likes</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="info">
                  <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button
                    onClick={() => {
                      setOpenUpdate(true);
                    }}
                  >
                    update
                  </button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
