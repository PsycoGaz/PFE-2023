import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        
        <hr className="line"/>
        <div className="bottom">
          <div className="left">
            <h2>FixIt</h2>
            <span>© FixIt Tunisia. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="https://w7.pngwing.com/pngs/133/360/png-transparent-social-media-computer-icons-tulane-university-facebook-drawing-twitter-twitter-logo-blue-logo-computer-wallpaper-thumbnail.png" alt="" />
              <img src="https://w7.pngwing.com/pngs/499/184/png-transparent-facebook-logo-sunfresh-salads-business-crowdfunding-progress-partners-inc-advertising-icon-fb-blue-food-logo-thumbnail.png" alt="" />
              <img src="https://w7.pngwing.com/pngs/1022/657/png-transparent-linked-in-logo-social-media-individual-social-network-linkedin-linked-in-blue-angle-text-thumbnail.png" alt="" />
              <img src="https://w7.pngwing.com/pngs/969/351/png-transparent-pinterest-logo-area-text-symbol-brand-app-pinterest-text-trademark-pin-thumbnail.png" alt="" />
              <img src="https://w7.pngwing.com/pngs/822/208/png-transparent-instagram-application-icon-social-media-logo-symbol-insta-text-monochrome-social-media-marketing-thumbnail.png" alt="" />
            </div>
            

            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;