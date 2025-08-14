import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="home-container">
        <div className="welcome-section">
          <h2>Welcome back, {currentUser?.name || "User"}!</h2>
          <p>Check out the latest updates and share your thoughts with friends</p>
        </div>
        <div className="content-section">
          <Stories/>
          <Share/>
          <div className="posts-container">
            <h3>Latest Updates</h3>
            <Posts/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home