/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../assets/logo.png';

import '../styles/components/Header.sass';

export default function Header() {
  return (
    <nav className="nav-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li><a className="navbar" href="#">Login</a></li>
        <li><a className="navbar" href="#">Registro</a></li>
      </ul>
    </nav>
  );
}
