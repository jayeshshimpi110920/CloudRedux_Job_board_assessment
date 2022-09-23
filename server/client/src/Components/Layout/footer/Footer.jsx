import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container' style={{width:"100vw" , fontSize:"3vw"}}>
        <h4>About Us</h4>
        <Link to='#' style={{fontSize:"10px"}}>Copyright © 2022 JOB_PORTAL_APP</Link>
      {/* <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>About Us</h3>
            <Link to='#'>How it works</Link>
            <Link to='#'>Testimonials</Link>
          </div>
          <div class='footer-link-items'>
            <h3>Contact Us</h3>
            <Link to='#'>Contact</Link>
            <Link to='#'>Terms of Service</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>Explore</h3>
            <Link to='#'>Compmay Reviews</Link>
            <Link to='#'>Job Applications</Link>
          </div>
          <div class='footer-link-items'>
            <h3>Social Media</h3>
            <Link to='#'>Instagram</Link>
            <Link to='#'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='#' className='social-logo'>
              NextJob
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>NextJob © 2022</small>
        </div>
      </section> */}
    </div>
  );
}

export default Footer;


// import React from 'react';
// import './Footer.css';
// import { Link } from 'react-router-dom';

// function Footer() {
//   return (
//     <div className='footer-container'>
//       <div class='footer-links'>
//         <div className='footer-link-wrapper'>
//           <div class='footer-link-items'>
//             <h2>About Us</h2>
//             <Link to='#'>How it works</Link>
//             <Link to='#'>Testimonials</Link>
//           </div>
//           <div class='footer-link-items'>
//             <h2>Contact Us</h2>
//             <Link to='#'>Contact</Link>
//             <Link to='#'>Terms of Service</Link>
//           </div>
//         </div>
//         <div className='footer-link-wrapper'>
//           <div class='footer-link-items'>
//             <h2>Explore</h2>
//             <Link to='#'>Compmay Reviews</Link>
//             <Link to='#'>Job Applications</Link>
//           </div>
//           <div class='footer-link-items'>
//             <h2>Social Media</h2>
//             <Link to='#'>Instagram</Link>
//             <Link to='#'>Twitter</Link>
//           </div>
//         </div>
//       </div>
//       <section class='social-media'>
//         <div class='social-media-wrap'>
//           <div class='footer-logo'>
//             <Link to='#' className='social-logo'>
//               NextJob
//               <i class='fab fa-typo3' />
//             </Link>
//           </div>
//           <small class='website-rights'>NextJob © 2022</small>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Footer;
