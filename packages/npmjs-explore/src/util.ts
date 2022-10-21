export const getPackageMeta = () => {
  const list = location.pathname.split('/');
  let name = list[2];
  let version = list[4] ?? 'latest';
  if (name.startsWith('@')) {
    name = list[2] + '/' + list[3];
    version = list[5] ?? 'latest';
  }
  return {
    name,
    version,
  };
};
