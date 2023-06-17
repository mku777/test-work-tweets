import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../redux/Users/operations";
import {
  selectUsers,
  selectFilter,
  selectFollowings,
} from "../redux/Users/selectors";

import { Filter } from "../components/Filter";
import { UsersList } from "../components/UsersList";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const filterOpts = ["all", "follow", "following"];

export const FeedPage = () => {
  const dispatch = useDispatch();
  const [onPage, setOnPage] = useState(3);

  const { items: users, isLoading, isError } = useSelector(selectUsers);
  const followings = useSelector(selectFollowings);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filterUsers = () => {
    if (filter === filterOpts[1]) {
      return users.filter((user) => !followings.includes(user.id));
    } else if (filter === filterOpts[2]) {
      return users.filter((user) => followings.includes(user.id));
    } else {
      return users;
    }
  };

  const filteredUsers = filterUsers();

  const visibleUsers = filteredUsers.slice(0, onPage);

  if (isError) {
    return (
      <div className="container">
        <h1 className="about-title">Sorry, something went wrong..</h1>
      </div>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="action-wrapper">
        <Filter options={filterOpts} onSelect={() => setOnPage(3)} />
        <Link to="/" className="button active">
          <AiOutlineArrowLeft style={{ marginRight: "10px" }} />
          homepage
        </Link>
      </div>
      <UsersList users={visibleUsers} />
      {filteredUsers.length > onPage && (
        <button
          className={`button active load-more-btn`}
          type="button"
          onClick={() => setOnPage((page) => page + 6)}>
          Load more
        </button>
      )}
    </div>
  );
};
