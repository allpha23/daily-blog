import React from 'react';
import PropTypes from 'prop-types';
import imgDefault from '../assets/unnamed.jpg';

import '../styles/components/BlogItem.sass';

export default function BlogItem({ blog, users, commentsOn }) {
  const findUser = (userId) => {
    const user = users.find((e) => userId === e.id);
    return user.username;
  };

  return (
    <div className="blog-item" onClick={() => commentsOn(blog.id)}>
      <h4>{blog.title}</h4>
      <p>{blog.body}</p>
      <div className="post-owner">
        <img src={imgDefault} alt="imgDefault" />
        <p>
          <span>@</span>
          {findUser(blog.userId)}
        </p>
      </div>
    </div>
  );
}

BlogItem.propTypes = {
  blog: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      find: PropTypes.func,
    }).isRequired,
  ).isRequired,
  commentsOn: PropTypes.func.isRequired,
};
