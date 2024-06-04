import { useLocation } from "react-router-dom";
import Login from "../../auth/Login";
import Signup from "../../auth/Signup";
import VerifyUser from "./VerifyUser";
import SetPassword from "./SetPassword";

function Layout() {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || 'login';
  return (
    <div className="flex">
      {/* form side */}
      <div className="form-side">
        <div className="form-content">
          {screen === 'signup' && <Signup />}
          {screen === 'login' && <Login />}
          {screen === 'verify' && <VerifyUser />}
          {screen === 'SetPassword' && <SetPassword/>}
        </div>
      </div>
      {/* end of form side */}

      {/* image side */}
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
      {/* end of image side */}
    </div>
  );
}

export default Layout;
