import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface PaymentItem {
  id: number;
  penjualanId: number;
  amountPaid: number;
  paymentDate: string;
  paymentStatus: string;
  remainingBalance: number;
  Penjualan: {
    transactionNumber: string;
    grandTotal: number;
    remainingBalance: number;
  };
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const PaymentsTable = () => {
  const [paymentsData, setPaymentsData] = useState<PaymentItem[]>([]);
  const [newPayment, setNewPayment] = useState({
    transactionNumber: '',
    amountPaid: 0,
    paymentDate: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [updateAmountModal, setUpdateAmountModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const [newAmountPaid, setNewAmountPaid] = useState(0);

  // Fetch payments data function
  const fetchPaymentsData = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: PaymentItem[] }>(
        'http://localhost:3001/pembayaran'
      );
      if (response.data.success) {
        setPaymentsData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, []); // Initially fetch data when the component mounts

  const handleCreatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/pembayaran', newPayment);
      if (response.data.success) {
        // Re-fetch the payment data after adding the new payment
        fetchPaymentsData();

        // Close the modal and reset the form
        setShowModal(false);
        setNewPayment({ transactionNumber: '', amountPaid: 0, paymentDate: '' });

        // Show success notification
        Swal.fire('Success!', 'Payment added successfully!', 'success');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      Swal.fire('Error!', 'Failed to add payment!', 'error');
    }
  };

  const handleUpdateAmountPaid = async () => {
    if (selectedPayment) {
      try {
        const response = await axios.put(
          `http://localhost:3001/pembayaran/${selectedPayment.id}`,
          { amountPaid: newAmountPaid }
        );
        if (response.data.success) {
          setPaymentsData(
            paymentsData.map((payment) =>
              payment.id === selectedPayment.id
                ? { ...payment, amountPaid: newAmountPaid }
                : payment
            )
          );
          setUpdateAmountModal(false);
          Swal.fire('Updated!', 'Payment amount updated successfully!', 'success');
        }
      } catch (error) {
        console.error('Error updating payment amount:', error);
        Swal.fire('Error!', 'Failed to update payment amount!', 'error');
      }
    }
  };

  const handleDeletePayment = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3001/pembayaran/${id}`);
          if (response.data.success) {
            setPaymentsData(paymentsData.filter((payment) => payment.id !== id));
            Swal.fire('Deleted!', 'Payment has been deleted.', 'success');
          }
        } catch (error) {
          console.error('Error deleting payment:', error);
          Swal.fire('Error!', 'Failed to delete payment!', 'error');
        }
      }
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewPayment({ transactionNumber: '', amountPaid: 0, paymentDate: '' });
  };

  const handleUpdateAmountModalClose = () => {
    setUpdateAmountModal(false);
    setSelectedPayment(null);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg w-full max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Pembayaran</h2>

      {/* Create Payment Button */}
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Payment
        </button>
      </div>

      {/* Modal for Create Payment */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-white">Add Payment</h3>

            {/* Payment Form */}
            <div>
              <label className="block mb-2 text-gray-300">Transaction Number</label>
              <input
                type="text"
                value={newPayment.transactionNumber}
                onChange={(e) => setNewPayment({ ...newPayment, transactionNumber: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                required
              />
              <label className="block mb-2 text-gray-300">Amount Paid</label>
              <input
                type="number"
                value={newPayment.amountPaid}
                onChange={(e) => setNewPayment({ ...newPayment, amountPaid: +e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                required
              />
              <label className="block mb-2 text-gray-300">Payment Date</label>
              <input
                type="date"
                value={newPayment.paymentDate}
                onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                required
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleCreatePayment}
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Update Amount Paid */}
      {updateAmountModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-white">Update Amount Paid</h3>

            <div>
              <label className="block mb-2 text-gray-300">Amount Paid</label>
              <input
                type="number"
                value={newAmountPaid}
                onChange={(e) => setNewAmountPaid(+e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                required
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateAmountModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdateAmountPaid}
              >
                Update Amount
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Transaction Number</th>
            <th scope="col" className="px-6 py-3">Amount Paid</th>
            <th scope="col" className="px-6 py-3">Payment Date</th>
            <th scope="col" className="px-6 py-3">Payment Status</th>
            <th scope="col" className="px-6 py-3">Remaining Balance</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentsData.map((payment, index) => (
            <tr
              key={payment.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4">
                {payment.Penjualan ? payment.Penjualan.transactionNumber : 'N/A'}
              </td>
              <td className="px-6 py-4">{formatCurrency(payment.amountPaid)}</td>
              <td className="px-6 py-4">{formatDate(payment.paymentDate)}</td>
              <td className="px-6 py-4">{payment.paymentStatus}</td>
              <td className="px-6 py-4">{formatCurrency(payment.remainingBalance)}</td>
              <td className="px-6 py-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => {
                    setSelectedPayment(payment);
                    setUpdateAmountModal(true);
                    setNewAmountPaid(payment.amountPaid);
                  }}
                >
                  Update Amount
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDeletePayment(payment.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PaymentsTable;
