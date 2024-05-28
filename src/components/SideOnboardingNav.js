import { NavLink } from 'react-router-dom';

function SideOnboardingNav() {

  return (
    <nav className="sidenav">
        <div className="logo">
            <img src="./img/logo.png" alt="Logo" />
        </div>
        <ul>
            <li>
            <NavLink exact to="/profile" activeClassName="active">
                <span>Complete Profile</span>
            </NavLink>
            </li>
            <li>
            <NavLink to="/company" activeClassName="active">
                <span>Register Company</span> 
            </NavLink>
            </li>
            <li>
            <NavLink to="/roles" activeClassName="active">
                <span>Create Roles</span> 
            </NavLink>
            </li>
            <li>
            <NavLink to="/invite/users" activeClassName="active">
                <span>Invite Users</span> 
            </NavLink>
            </li>
        </ul>
    </nav>
  );
}

export default SideOnboardingNav;
