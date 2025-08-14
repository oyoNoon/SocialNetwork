import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import PostDetail from "./PostDetail";

const PostDetailPage = () => {
  const { postId } = useParams();

  const {
    error,
    isLoading,
    data: post,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () =>
      makeRequest.get(`/posts/${postId}`).then((res) => {
        return res.data;
      }),
  });

  if (error) {
    return <PostDetail post={null} />;
  }

  if (isLoading) {
    return (
      <div className="postDetail">
        <div className="container">
          <div className="loading">
            <h2>Loading Post...</h2>
          </div>
        </div>
      </div>
    );
  }

  return <PostDetail post={post} />;
};

export default PostDetailPage;