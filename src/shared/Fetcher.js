import { apis } from "../shared/axios";

export const FeedFetcher = async (url) => {
  const { data } = await apis.contentGet(url);
  return data;
};

export const NewsFetcher = async (url) => {
  const { data } = await apis.newsGet(url);
  return data;
};

export const MainFetcher = async (url) => {
  const { data } = await apis.policyGet(url);
  return data;
};
