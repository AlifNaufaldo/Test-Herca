import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for commission data
interface CommissionItem {
  marketing: string;
  month: string;
  omzet: number;
  commissionPercentage: number;
  commissionNominal: number;
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
};

const formatMonth = (month: string) => {
  const date = new Date(month);
  const monthName = date.toLocaleString('default', { month: 'long' });
  return monthName;
};

const CommissionTable = () => {
  const [commissionData, setCommissionData] = useState<CommissionItem[]>([]);

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: CommissionItem[] }>(
          'http://localhost:3001/marketing/commission'
        );
        console.log(response.data, 'API Response');
        if (response.data.success) {
          setCommissionData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching commission data:', error);
      }
    };

    fetchCommissionData();
  }, []);

  return (
    <div
      className="overflow-x-auto shadow-md sm:rounded-lg w-full max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800"
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      <h2 className="text-2xl font-semibold mb-4">Commission</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Marketing Name
            </th>
            <th scope="col" className="px-6 py-3">
              Month
            </th>
            <th scope="col" className="px-6 py-3">
              Omzet
            </th>
            <th scope="col" className="px-6 py-3">
              Commission Percentage
            </th>
            <th scope="col" className="px-6 py-3">
              Commission Nominal
            </th>
          </tr>
        </thead>
        <tbody>
          {commissionData.map((item, index) => (
            <tr
              key={`${item.marketing}-${item.month}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4">{item.marketing}</td>
              <td className="px-6 py-4">{formatMonth(item.month)}</td>
              <td className="px-6 py-4">{formatCurrency(item.omzet)}</td>
              <td className="px-6 py-4">{item.commissionPercentage}%</td>
              <td className="px-6 py-4">{formatCurrency(item.commissionNominal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionTable;
