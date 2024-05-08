import "../styles/components/GroupCreationShow.css";

const GroupCreationShow = () => {
  return (
    <div className="container">
      <div className="group-creation-image">
        <img src="/images/empty.jpg" width={100} height={100} />
      </div>
      <h4 className="group-creation-title">Let’s Get Started</h4>
      <p className="group-creation-description">
        Create your first group to organize your accounts. Click the
      </p>
      <span className="click-description">
        “Create SubGroup” button
          above to begin.
        </span>
    </div>
  );
};

export default GroupCreationShow;
