import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {
    render() {
        return (
  <header className="header">
    <nav>
      <ul className="nav">
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
      </ul>
    </nav>
  </header>
);
    }
}