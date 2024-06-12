export const handleAxiosError = err => {
  const msgPrefix = 'Request failed with error:';
  if (err.name === 'AxiosError') {
    throw new Error(
      `${msgPrefix} ${err.response.data?.message} and status text ${err.response.statusText}`
    );
  }
  throw new Error(`${msgPrefix} ${err.message}`);
};
