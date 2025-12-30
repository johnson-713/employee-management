import type { AxiosProgressEvent } from "axios";
import appAxios from "./appAxios";

const makePutRequest = async (endpoint: string, body: unknown, headers?: object, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
  const { data } = await appAxios().put(endpoint, body, {
    headers: {
      ...headers,
    },
    onUploadProgress,
  });
  return data;
};

export default makePutRequest;
