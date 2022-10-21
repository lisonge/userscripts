import { useEffect, useState } from 'preact/hooks';
import { getPackageMeta } from './util';

export function App() {
  const [jsdelivrUrl, setJsdelivrUrl] = useState('');
  const [unpkgUrl, setUnpkgUrl] = useState('');
  useEffect(() => {
    const invoke = () => {
      const { name, version } = getPackageMeta();
      setJsdelivrUrl(`https://cdn.jsdelivr.net/npm/${name}@${version}/`);
      setUnpkgUrl(`https://unpkg.com/browse/${name}@${version}/`);
    };
    invoke();
    const task = setInterval(invoke, 1000);
    return () => {
      clearInterval(task);
    };
  }, []);

  return (
    <>
      <div
        style={{
          marginLeft: '20px',
        }}
      >
        <a
          href={unpkgUrl}
          title={unpkgUrl}
          target="_blank"
          style={{ color: '#bb2e3e', textDecoration: 'none' }}
        >
          unpkg
        </a>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
          }}
        ></span>
        <a
          href={jsdelivrUrl}
          title={jsdelivrUrl}
          target="_blank"
          style={{ color: '#bb2e3e', textDecoration: 'none' }}
        >
          jsdelivr
        </a>
      </div>
    </>
  );
}
