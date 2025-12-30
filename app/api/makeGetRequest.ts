import appAxios from "./appAxios";

const makeGetRequest = async (endpoint: string, params = {}, headers = {}) => {
  const { data } = await appAxios().get(endpoint, {
    headers: {
      ...headers,
    },
    params: params,
    paramsSerializer: {
      indexes: null,
    },
  });
  return data;
};

export default makeGetRequest;
