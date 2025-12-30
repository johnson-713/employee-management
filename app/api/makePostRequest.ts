import appAxios from "./appAxios";

const makePostRequest = async (
  endpoint: string,
  body: unknown,
  headers?: object
) => {
  const { data } = await appAxios().post(endpoint, body, {
    headers: {
      ...headers,
    },
  });
  return data;
};

export default makePostRequest;
