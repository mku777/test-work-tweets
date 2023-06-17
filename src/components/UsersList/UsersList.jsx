import { UserCard } from "../../components//UserCard";

import PropTypes, { arrayOf } from "prop-types";

import css from "./UsersList.module.css";

export const UsersList = ({ users }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

UsersList.propTypes = {
  users: arrayOf(PropTypes.object),
};
