import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="container">
      <div className="about">
        <h1 className="about-title">Welcome to home page</h1>
        <Link to="/feed" className="button about-btn">
          View tweets
        </Link>
      </div>
    </div>
  );
};
