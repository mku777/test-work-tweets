import { useSelector, useDispatch } from "react-redux";

import { selectFollowings } from "../../redux/Users/selectors";

import { addFollowing, removeFollowing } from "../../redux/Users/usersSlice";

import PropTypes from "prop-types";

import css from "./UserCard.module.css";

const formatFollowers = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const UserCard = ({ user: { id, user, tweets, followers, avatar } }) => {
  const dispatch = useDispatch();
  const followings = useSelector(selectFollowings);

  const isFollowed = () => followings.includes(id);

  if (isFollowed()) {
    followers = Number(followers) + 1;
  }

  return (
    <div className={css.card}>
      <div className={css.top}></div>
      <div className={css.divider}>
        <div className={css.userImageWrapper}>
          <img src={avatar} alt={user} />
        </div>
      </div>
      <div className={css.info}>
        <p className={css.tweets}>{tweets} tweets</p>
        <p className={css.followers}>{formatFollowers(followers)} followers</p>
        {!isFollowed() ? (
          <button
            type="button"
            className={`button ${css.followBtn}`}
            onClick={() => dispatch(addFollowing(id))}>
            Follow
          </button>
        ) : (
          <button
            type="button"
            className={`button ${css.followBtn} active`}
            onClick={() => dispatch(removeFollowing(id))}>
            Following
          </button>
        )}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};
