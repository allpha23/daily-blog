import React, { useState, useEffect } from 'react';
import BlogItens from '../components/BlogItem';
import Header from '../components/Header';
import Teste from '../components/Comments';
import { requestData } from '../services/requests';

import '../styles/pages/Blog.sass';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [popup, setPopup] = useState(false);

  const getPosts = (endPoint) => requestData(endPoint)
    .then((response) => setBlogs(response))
    .catch((error) => console.log(error));

  const getUsers = (endPoint) => requestData(endPoint)
    .then((response) => setUsers(response))
    .catch((error) => console.log(error));

  const getComments = (endPoint) => requestData(endPoint)
    .then((response) => setComments(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    const apiPosts = '/posts';
    const apiUsers = '/users';

    getPosts(apiPosts);
    getUsers(apiUsers);
  }, []);

  const commentsOn = (id) => {
    const apiComents = `/posts/${id}/comments`;

    getComments(apiComents);
    setPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const commentsOff = () => {
    setPopup(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <div className="blog-container">
        <h1>Daily Blog</h1>
        <p className="blog-subtitle">
          um lugar incrível para se tornar produtivo e
          entretido por meio de atualizações diárias
        </p>
        <div className="blog-wrap">
          {blogs.map((blog) => (<BlogItens blog={blog} users={users} commentsOn={commentsOn} />))}
        </div>
      </div>
      {popup && (<div className="comments-container"><Teste comments={comments} commentsOff={commentsOff} /></div>)}
    </>
  );
}
