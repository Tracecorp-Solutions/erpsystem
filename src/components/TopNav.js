import { Link } from 'react-router-dom';
import { Plus, BellDot, ChevronDown } from 'lucide-react';

function TopNav() {
  const user = {
    name: 'Nakitto Catherine',
    imageUrl: './img/profile-pic.png',
    imageSize: 40,
  };

  return (
    <div className="topnav">
      <ul>
        <li>
          <Link to="/" className="btn">
          <Plus /><span>New Entry</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="notif">
            <BellDot />
          </Link>
        </li>
        <li>
          <Link to="/" className="profile">
          <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize
            }} />
            <span>{user.name}</span>
            <ChevronDown />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TopNav;
