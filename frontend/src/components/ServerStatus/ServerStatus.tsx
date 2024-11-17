import { useEffect, useState } from 'react';
import { ServerStatusType } from '../../types/ServerStatus';

const ServerStatus = () => {
  const [status, setStatus] = useState<ServerStatusType>('loading');

  useEffect(() => {
    const ws = new WebSocket(`${process.env.REACT_APP_API_URL}/`);

    ws.onopen = () => {
      setStatus('ok');
    };

    ws.onclose = () => {
      setStatus('error');
    };

    ws.onerror = () => {
      setStatus('error');
    };

    return () => {
      ws.close();
    };
  }, []);

  const getBadgeClass = () => {
    switch (status) {
      case 'ok':
        return 'badge text-bg-success';
      case 'error':
        return 'badge text-bg-danger';
      case 'loading':
        return 'badge text-bg-primary';
      default:
        return 'badge text-bg-secondary';
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case 'ok':
        return 'Serwer: OK';
      case 'error':
        return 'Błąd połączenia';
      case 'loading':
        return 'Ładowanie...';
      default:
        return 'Nieznany status';
    }
  };

  return <span className={getBadgeClass()}>{getBadgeText()}</span>;
};

export default ServerStatus;
