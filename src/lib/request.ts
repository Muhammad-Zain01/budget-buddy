const request = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  return await fetch(url, options);
};

export default request;
