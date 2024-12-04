import { NavLink } from "react-router-dom";
import "/src/styles.css";
import gif from "/src/assets/tesla.gif"; // Path to your GIF file

function MyComponent() {
  return (
    <div className="video">
      {/* Background GIF */}
      <img src={gif} alt="Background GIF" className="background-gif" />

      {/* Color Overlay */}
      <div className="overlay"></div>

      <div className="content">
        <h1 className="Title">Welcome to ZipTrip!</h1>
        <br />
        <p className="Paragraph">
        Join a community of travelers who share rides and reduce the carbon footprint together. Connect with others, save money, and explore new places—all while making a positive impact on the environment.
        </p>
        <NavLink to="/signin" activeClassName="active">
          <button className="Continue">Get Started</button>
        </NavLink>
      </div>
    </div>
  );
}

export default MyComponent;
