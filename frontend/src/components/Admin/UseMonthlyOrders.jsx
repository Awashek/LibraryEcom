import { useEffect, useState } from 'react';
import useAxiosAuth from '../utils/axios/useAxiosAuth';

export default function useMonthlyOrders(numberOfMonths) {
  const axios = useAxiosAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/dashboard/monthly-orders?numberOfMonths=${numberOfMonths}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching monthly orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [numberOfMonths]);

  return { data, loading };
}
