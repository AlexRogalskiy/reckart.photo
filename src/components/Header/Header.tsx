import React from "react";

import pickles from "../../photos/pickles.jpeg";

import "./Header.css";

export default function Header(): React.ReactElement {
  return (
    <header>
      <nav>
        <a className="pickles" href="/">
          <img src={pickles} width="36px" />
        </a>
        <ul>
          <li>
            <a href="https://reckart.blog">Home</a>
          </li>
          <li>
            <a href="https://reckart.blog/blog">Blog</a>
          </li>
          <li>
            <a href="https://reckart.blog/about">About</a>
          </li>
          <li>
            <a className="active" href="/">
              Gallery
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
