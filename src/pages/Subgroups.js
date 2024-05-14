import TopNav from "../components/TopNav";
import { Plus } from 'lucide-react';

function Subgroups() {
  return (
    <div className="content">
      <TopNav />
      <div className="top-content">
        <div className="title">
          <h2>Subgroups</h2>
          <button className="create-btn"><Plus /><span>Create Subgroup</span></button>
        </div>
      </div>
    </div>
  );
}

export default Subgroups;
