import React from 'react';
import { Link } from 'gatsby';

// We're not using this, but Gatsby does have a navigate component that lets you use links in buttons
// and things like that (although you really shouldn't put a link in a button IMO)
// function goToSlicemasters() {
//   setTimeout(() => {
//     console.log('Go to slicers!!');
//     navigate('/slicemasters', { replace: true });
//   }, 2000);
// }

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
