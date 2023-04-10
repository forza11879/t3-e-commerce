import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && void router.push('/');
    // cleanup
    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
