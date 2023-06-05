import NavBar from "./NavBar";
import ReactFlowRenderer from "./ReactFlowRender";
import "antd/dist/reset.css";
import SideNavBar from "./SideNavBar";
import "./MindMap.css"

function MindMap({ handleLogout }) {
  return (
    <div className="mindmap-container">
      <div className="navBarS">
        <SideNavBar />
      </div>
      <div className="main-content">
        <NavBar
          welcomeText={"Start vizualizing your thread of ideas now!"}
          handleLogout={handleLogout}
        />
        <div className="main-container">
          <ReactFlowRenderer />
        </div>
      </div>
    </div>
  );
}

export default MindMap;
