import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { requestData } from '../services/requests';
import imgDefault from '../assets/unnamed.jpg';

import '../styles/components/BlogItem.sass';

export default function BlogItens({ blog, users }) {
  const [coments, setComents] = useState([]);
  const [popup, setPopup] = useState(false);

  const getComents = (endPoint) => requestData(endPoint)
    .then((response) => setComents(response))
    .catch((error) => console.log(error));

  const showComents = (id) => {
    const apiComents = `/posts/${id}/comments`;

    getComents(apiComents);
    setPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const hiddenComents = () => {
    setPopup(false);
    document.body.style.overflow = 'auto';
  };

  const findUser = (userId) => {
    const user = users.find((e) => userId === e.id);
    return user.username;
  };

  return (
    <div key={blog.id} className="blog-item" onClick={() => showComents(blog.id, blog.userId)}>
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
};
