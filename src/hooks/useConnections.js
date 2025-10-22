import { useEffect, useState } from 'react';

export default function useConnections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setConnections([
        { id: 'ml', name: 'Mercado Livre', status: 'connected' },
        { id: 'shp', name: 'Shopee', status: 'disconnected' }
      ]);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return { connections, loading };
}

