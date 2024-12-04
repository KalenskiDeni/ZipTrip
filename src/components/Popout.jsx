//created by Beatrise

import "/src/styles.css";

const ResizePopout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popout-overlay">
      <div className="popout-content">
        <h2>Resize Your Screen</h2>
        <p>Please resize your screen to 393x804px for the best experience ;D</p>
        <button onClick={onClose} className="close-button">
          Okay!
        </button>
      </div>
    </div>
  );
};

export default ResizePopout;
