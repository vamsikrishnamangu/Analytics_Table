import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import axios from "axios";

export const FetchData = () => {
  const startDate = useAnalyticsStore((s) => s.startDate);
  const endDate = useAnalyticsStore((s) => s.endDate);
  axios
    .get(
      `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
