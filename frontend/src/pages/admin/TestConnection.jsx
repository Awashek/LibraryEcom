import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/axios/useAxios';

const TestConnection = () => {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  const { data, refetch } = useAxios('author');

  console.log('Data from API:', data);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔌 Backend Connection Test</h2>
    </div>
  );
};

export default TestConnection;
