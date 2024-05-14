import "../styles/components/GroupCreationShow.css";

const AccountLoadingMessage = () => {
  return (
    <div className="container">
      <div className="group-creation-image">
        <img src="/images/empty.jpg" width={100} height={100} />
      </div>
      <h4 className="group-creation-title">Let's keep organizing!</h4>
      <p className="group-creation-description">
        You haven't created any accounts yet.
      </p>
    </div>
  );
};

export default AccountLoadingMessage;
