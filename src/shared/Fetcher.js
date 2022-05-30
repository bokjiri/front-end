import { apis } from "../shared/axios";

export const Fetcher = async (url) => {
  const { data } = await apis.contentGet(url);
  return data;
};
