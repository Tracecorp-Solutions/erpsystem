import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import { Plus } from 'lucide-react';

function Accounts() {
  return (
    <>
      <SideNav />
      <div className="content">
        <TopNav />
        <div className="top-content">
          <div className="title">
            <h2>Accounts</h2>
            <button className="create-btn"><Plus /><span>Create Account</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accounts;
