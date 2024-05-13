import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";

function Accounts() {
  return (
    <div className="content">
      <TopNav />
      <h1>Accounts</h1>
      <div>
        <Link to="/accounts">Create Account</Link>
      </div>
    </div>
  );
}

export default Accounts;
