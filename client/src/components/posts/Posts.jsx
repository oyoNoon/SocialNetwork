import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ userId }) => {
  const { error, isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  });
  if (error) {
    console.log("Error occurred:", error);
  }
  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : data && data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
