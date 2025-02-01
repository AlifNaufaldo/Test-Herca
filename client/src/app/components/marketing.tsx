import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for marketing data
interface MarketingItem {
  marketing: string;
  month: string;
  omzet: number;
  commissionPercentage: number;
  commissionNominal: number;
}

const MarketingTeam = () => {
  const [marketingData, setMarketingData] = useState<MarketingItem[]>([]);

  useEffect(() => {
    const fetchMarketingData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: MarketingItem[] }>(
          'http://localhost:3001/marketing/'
        );
        const result = response.data;

        if (result.success) {
          const uniqueMarketingNames: MarketingItem[] = [];
          const marketingMap = new Set<string>();

          result.data.forEach((item) => {
            if (!marketingMap.has(item.marketing)) {
              uniqueMarketingNames.push(item);
              marketingMap.add(item.marketing);
            }
          });

          setMarketingData(uniqueMarketingNames);
        }
      } catch (error) {
        console.error('Error fetching marketing data:', error);
      }
    };

    fetchMarketingData();
  }, []);

  return (
    <div
      className="overflow-x-auto shadow-md sm:rounded-lg w-full max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800"
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      <h2 className="text-2xl font-semibold mb-4">Marketing Team</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Marketing Name
            </th>
          </tr>
        </thead>
        <tbody>
          {marketingData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.marketing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingTeam;
