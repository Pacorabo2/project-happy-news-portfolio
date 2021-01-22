import React from 'react';

// Import du CSS
import './style.scss';

const Footer = () => (
  <footer className="footer">
    <ul className="footer__list">
      <li className="footer__list__item"><a className="footer__link__item__link" href="#">Mentions légales</a></li>
      <li className="footer__list__item"><a className="footer__link__item__link" href="#">A propos</a></li>
      <li className="footer__list__item"><a className="footer__link__item__link" href="#">Conditions générales</a></li>
      <li className="footer__list__item"><a className="footer__link__item__link" href="#">Contact</a></li>
    </ul>
  </footer>
);

export default Footer;