// Created by Deni Kalenski
import "/src/styles.css";

// Importing icons and images
import globeIcon from "../assets/icons/globe-icon.png";
import arrowIcon from "../assets/icons/arrow-icon.svg";
import languageIcon from "../assets/icons/flag/DK.svg";
import verificationIcon from "../assets/icons/verification-icon.svg";
import settingsIcon from "../assets/icons/cog-icon.svg";
import favouritesIcon from "../assets/icons/heart-icon.svg";
import archiveIcon from "../assets/icons/archive-icon.svg";
import subscriptionsIcon from "../assets/icons/star-icon.svg";
import travelIcon from "../assets/icons/travel-icon.png";

// ProfilePage component
export default function ProfilePage() {
  return (
    <section className="profile-page">
      <div className="earth-section">
        <div className="earth-image">
          <div className="countries-stats">
            <div className="stat">
              <p className="stat-number">1 / 202</p>
              <p className="stat-label">countries been</p>
            </div>

            <div className="divider">
              <hr />
              <img src={arrowIcon} alt="Arrow Icon" className="arrow-icon" />
            </div>

            <div className="stat">
              <p className="stat-number">0%</p>
              <p className="stat-label">of the world</p>
            </div>
          </div>
        </div>
      </div>

      <div className="your-countries-button">
        <img src={globeIcon} alt="Globe Icon" className="icon" />
        <span>Your countries</span>
      </div>

      <div className="profile-info">
        <div className="profile-header">
          <div className="outer-thumbnail-container">
            <div className="profile-thumbnail-container">
              <div className="profile-thumbnail" />
            </div>
          </div>
          <h2>Alex, 21</h2>
          <div className="language-display">
            <img
              src={languageIcon}
              alt="Language Icon"
              className="language-icon"
            />
            <p>Danish</p>
          </div>
        </div>

        <button className="action-btn">View Profile</button>
        <button className="action-btn">Edit Profile</button>

        <div className="verification">
          <img
            src={verificationIcon}
            alt="Verification Icon"
            className="verification-icon"
          />
          <div className="verification-text">
            <p>Not Verified Yet</p>
            <span>Verify your profile to get a verification badge</span>
          </div>
        </div>

        <ul className="settings-list">
          <li>
            <img
              src={settingsIcon}
              alt="Settings Icon"
              className="icon-profile"
            />
            General Settings
          </li>
          <li>
            <img
              src={favouritesIcon}
              alt="Favourites Icon"
              className="icon-profile"
            />
            Favourites
          </li>
          <li>
            <img
              src={archiveIcon}
              alt="Archive Icon"
              className="icon-profile"
            />
            Archive
          </li>
          <li>
            <img
              src={subscriptionsIcon}
              alt="Subscriptions Icon"
              className="icon-profile"
            />
            My Subscriptions
          </li>
        </ul>

        <div className="travel-assistant-card">
          <div className="pro-feature-badge">Pro Feature</div>
          <div className="travel-content">
            <div className="travel-text">
              <h2>Travel Assistant</h2>
              <p>Smartest AI Travel Assistant</p>
              <a href="/offthepath-pro" className="cta-link">
                Get OffThePath Pro
              </a>
            </div>
            <img src={travelIcon} alt="Travel Icon" className="travel-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}
