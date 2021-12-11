import React from "react";

import pickles from '../../photos/pickles.jpeg';

import "./Header.css";

export default function Header(): React.ReactElement {
  return (
    <header>
      <nav>
        <img src={pickles} width="36px" style={{ borderRadius: '50%' }} />
        <ul>
          <li>
            <a href="https://reckart.blog">home</a>
          </li>
          <li>
            <a href="https://reckart.blog/blog">blog</a>
          </li>
          <li>
            <a href="https://reckart.blog/about">about</a>
          </li>
          <li>
            <a className="active" href="/">
              gallery
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
