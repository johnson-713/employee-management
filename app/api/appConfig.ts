const getHostAPIUrl = () => {
  const ENV = process.env.NEXT_PUBLIC_NODE_ENV;

  if (ENV == "staging") {
    return `https://dummyjson.com/`;
  }

  return `https://dummyjson.com/`;
};
export default getHostAPIUrl;
