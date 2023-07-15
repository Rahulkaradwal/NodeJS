import "./App.css";
import { useState } from "react";
import StudentSignIn from "./StudentSignIn";
import TeacherSignIn from "./StudentSignIn";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const renderContent = () => {
    if (selectedRole === "student") {
      return <StudentSignIn />;
    } else if (selectedRole === "teacher") {
      return <TeacherSignIn />;
    } else {
      return <Role onSelectRole={handleRoleSelection} />;
    }
  };

  return <div className="container">{renderContent()}</div>;
}

function Role({ onSelectRole }) {
  return (
    <div className="wrapper">
      <div>Select Your Role</div>
      <div className="role">
        <div className="card" onClick={() => onSelectRole("student")}>
          Student
        </div>
        <div className="card" onClick={() => onSelectRole("teacher")}>
          Teacher
        </div>
      </div>
      {/* <button className="next">Next</button> */}
    </div>
  );
}

export default App;
