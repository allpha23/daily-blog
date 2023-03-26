import React from 'react';
import PropTypes from 'prop-types';
import imgDefault from '../assets/unnamed.jpg';

import '../styles/components/BlogItem.sass';

export default function BlogItens({ blog, users, commentsOn }) {
  const findUser = (userId) => {
    const user = users.find((e) => userId === e.id);
    return user.username;
  };

  return (
    <div key={blog.id} className="blog-item" onClick={() => commentsOn(blog.id, blog.userId)}>
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

BlogItens.propTypes = {
  blog: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  users: PropTypes.shape({
    find: PropTypes.func,
  }).isRequired,
  commentsOn: PropTypes.func.isRequired,
};
