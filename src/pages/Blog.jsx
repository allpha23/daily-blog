import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import BlogItem from '../components/BlogItem';
import Header from '../components/Header';
import Comments from '../components/Comments';
import { requestData } from '../services/requests';

import '../styles/pages/Blog.sass';
import 'react-toastify/dist/ReactToastify.css';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(true)
  const [next, setNext] = useState(0);
  const [comments, setComments] = useState([]);
  const [popup, setPopup] = useState(false);

  const getPosts = (endPoint) => requestData(endPoint)
    .then((response) => setBlogs(response))
    .catch((error) => toast.error(error));

  const getUsers = (endPoint) => requestData(endPoint)
    .then((response) => setUsers(response))
    .catch((error) => toast.error(error));

  const getComments = (endPoint) => requestData(endPoint)
    .then((response) => setComments(response))
    .catch((error) => toast.error(error));

  useEffect(() => {
    const page = next * 20
    const apiPosts = `/posts?_start=${page}&_limit=20`;
    const apiUsers = '/users';

    getPosts(apiPosts);
    getUsers(apiUsers);
  }, [next]);

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

  const nextPage = () => {
    setNext(next + 1)
    setDisable(false)
  }

  const previousPage = () => {
    setNext(next - 1)
    if (next == 1) setDisable(true)
  }

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
          {blogs.map((blog) => (<div key={blog.id}><BlogItem blog={blog} users={users} commentsOn={commentsOn} /></div>))}
        </div>
        <div className='nav-page'>
          <button type='button' disabled={disable} onClick={() => previousPage()}>Anterior</button>
          <span>{next + 1}</span>
          <button type='button' onClick={() => nextPage()}>Próxima</button>
        </div>
      </div>
      {popup && (<div className="comments-container"><Comments comments={comments} commentsOff={commentsOff} /></div>)}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
