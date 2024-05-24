import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import { Plus } from 'lucide-react';

function Groups() {
  return (
    <>
      <SideNav />
      <div className="content">
        <TopNav />
        <div className="top-content">
          <div className="title">
            <h2>Groups</h2>
            <button className="create-btn"><Plus /><span>Create Group</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Groups;
