import appAxios from "./appAxios";

const makePatchRequest = async (
  endpoint: string,
  body: unknown,
  headers = {}
) => {
  const { data } = await appAxios().patch(endpoint, body, {
    headers: {
      ...headers,
    },
  });
  return data;
};

export default makePatchRequest;
