export const throttle = <T extends (...args: any[]) => Promise<void>>(
  fn: T
) => {
  let isRunning = false;
  return (async (...args: any[]) => {
    if (isRunning) {
      return;
    }
    isRunning = true;
    await fn(...args).catch((e) => {
      isRunning = false;
      throw e;
    });
    isRunning = false;
  }) as T;
};

export const delay = async (n = 0) => {
  await new Promise((res) => {
    setTimeout(res, n);
  });
};
