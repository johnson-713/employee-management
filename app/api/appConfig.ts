const getHostAPIUrl = () => {
  const ENV = process.env.NEXT_PUBLIC_NODE_ENV;

  if (ENV == "staging") {
    return `https://api-staging.mablle.com/`;
  } else if (ENV == "uat") {
    return `https://api-staging.mablle.com/`;
  } else if (ENV == "production") {
    return `https://api-staging.mablle.com/`;
  }
  // For testing, let's use a mock API or the staging backend
  return `https://api-staging.mablle.com/`;
};
export default getHostAPIUrl;
