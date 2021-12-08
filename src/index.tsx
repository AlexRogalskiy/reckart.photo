import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { HeadProvider, Title, Link, Meta } from 'react-head';

ReactDOM.render(
  <React.StrictMode>
    <HeadProvider>
      <main>
        <Title>Tyler Reckart | reckart.photo</Title>
        <Link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap" />
        <App />
      </main>
    </HeadProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
