/*import { useEffect } from 'react';
import { useRouter } from 'next/router';

function PrivateRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token'); // Cambiar esto
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}

export default PrivateRoute;*/