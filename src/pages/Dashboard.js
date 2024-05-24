import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import SideNav from '../components/SideNav';

function Dashboard() {
  return (
    <>
    <SideNav />
    <div className="content">
      <TopNav />
      <div>
        <h1>Dashboard</h1>
        <p>This is the Dashboard</p>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
