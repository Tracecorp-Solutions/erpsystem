import { useLocation } from "react-router-dom";
import Login from "../../auth/Login";
import Signup from "../../auth/Signup";

function Layout() {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || 'login';

  console.log("Current screen:", screen); // Log the current screen

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          {screen === 'signup' ? <Signup /> : <Login />}
        </div>
      </div>

      <div className="img-side">
        <div className="img-content">
          <div className="img-intro">
            <h2>TraceAccounting</h2>
            <p>We are excited to help you streamline your invoicing process and efficiently manage your finances. Let’s get started.</p>
          </div>
          <div className="img-wrapper">
            <img src="/img/dashboard.png" alt="signup" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
