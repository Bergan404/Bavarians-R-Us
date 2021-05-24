import React from 'react';

import './footer.css'

const Footer = () => {

  return (
    <div className="footer">
      <a href='https://github.com/Bergan404' className="footer_att"><i className="fab fa-github"></i> Github</a>
      <a href='https://www.linkedin.com/in/bergan-oudshoorn-2475331a6/' className="footer_att"><i className="fab fa-linkedin"></i> Linked-In</a>
      <a href='https://bergan404.github.io/' className="footer_att"><i className="fas fa-id-card"></i> Portfolio</a>
    </div>
  );
}

export default Footer;
