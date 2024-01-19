import { getPinpointsProps, getPinpointsData } from "@/types";
import axios from "./axios";

export const getPinpoints = async ({
  query = "",
  limit = 0,
  offset = 0,
}: getPinpointsProps): Promise<getPinpointsData> => {
  console.log({ limit, offset });
  const response: { data: getPinpointsData } = await axios.get(
    `/pinpoints/search?query=${query}&limit=${limit}&offset=${offset}`
  );
  console.log({ response });
  console.log(response.data.results[0]);  
  return response.data;
};
