export const handleAxiosError = err => {
  const msgPrefix = 'Request failed with error:';
  console.error('http request failed with error', err);
  if (err.name === 'AxiosError') {
    throw new Error(
      `${msgPrefix} ${
        err.response?.data?.message || err.message
      } and status text ${err.response?.statusText || err.code}`
    );
  }
  throw new Error(`${msgPrefix} ${err.message}`);
};
