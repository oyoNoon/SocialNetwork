import "./rightBar.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";

const RightBar = () => {
  const queryClient = useQueryClient();

  const { data: suggestionsData } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => makeRequest.get("/users/suggestions").then((res) => res.data),
  });

  const { data: activitiesData } = useQuery({
    queryKey: ["activities"],
    queryFn: () => makeRequest.get("/users/activities").then((res) => {
      // console.log(res.data)
      return res.data}),
  });

  const followMutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["suggestions"]);
    },
  });

  const handleFollow = (userId) => {
    followMutation.mutate(userId);
  };


  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="content">
            {suggestionsData?.map((user) => (
              <div className="user" key={user.userId}>
                <Link to={`/profile/${user.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="userInfo">
                    <img
                      src={user.profilePic ? `http://www.milanet.homes/uploads/${user.profilePic}` : "/imgs/profilePic.png"}
                      alt=""
                    />
                    <span>{user.name}</span>
                  </div>
                </Link>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.userId)}>follow</button>
                </div>
              </div>
            ))}
            {(!suggestionsData || suggestionsData.length === 0) && (
              <div className="user">
                <div className="userInfo">
                  <p>No suggestions available</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="content">
            {activitiesData?.map((activity) => (
              <div className="user" key={activity.postId}>
                <Link to={`/posts/${activity.postId}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="userInfo">
                    <img
                      src={activity.profilePic ? `http://www.milanet.homes/uploads/${activity.profilePic}` : "/imgs/profilePic.png"}
                      alt=""
                    />
                    <p>
                      <span>{activity.name}</span> created a post
                    </p>
                  </div>
                </Link>
                <span>{moment(activity.createdAt).fromNow()}</span>
              </div>
            ))}
            {(!activitiesData || activitiesData.length === 0) && (
              <div className="user">
                <div className="userInfo">
                  <p>No recent activities from your friends</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightBar;
