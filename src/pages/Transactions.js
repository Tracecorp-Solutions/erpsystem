import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import { Plus, EllipsisVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import CreateTransaction from "../components/CreateTransaction";
import SideNav from "../components/SideNav";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    // Logic to handle form submission (e.g., send data to backend)
    console.log('Form data:', formData);
    // Close modal after submitting
    closeModal();
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://3.216.182.63:8095/RetrieveTransactions");
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Function to format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <SideNav />
      <div className="content">
        <TopNav />
        <div className="top-content">
          <div className="title">
            <h2>Transactions</h2>
            <button onClick={openModal} className="create-btn"><Plus /><span>Create Transaction</span></button>
          </div>
          {isModalOpen && (
            <CreateTransaction isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
          )}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <table className="transactions-table">
              <thead>
                <tr>
                  {/* <th className="caption">ID</th> */}
                  <th className="caption">Ref Number</th>
                  <th className="caption">Account to</th>
                  <th className="caption">Account from</th>
                  <th className="caption date">Date</th>
                  <th className="caption amount">Amount</th>
                  <th className="caption actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    {/* <td>{transaction.id}</td> */}
                    <td>{transaction.tranReference}</td>
                    <td>{transaction.accountToId}</td>
                    <td>{transaction.accountFromId}</td>
                    <td className="date">{formatDate(transaction.transactionDate)}</td>
                    <td className="amount">{transaction.amount}</td>
                    <td className="actions">
                      <Link to="/" className="more">
                        <EllipsisVertical />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Transactions;
