
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';

export default function Error({ statusCode }: { statusCode: number }) {
  const router = useRouter();

  useEffect(() => {
    console.log('🔥 404 or error page triggered at:', router.pathname);
  }, [router.pathname]);

  return (
    <div style={{ padding: 40 }}>
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};
