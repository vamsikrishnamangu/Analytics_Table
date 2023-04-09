import React, { useState } from "react";
import axios from "axios";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";
const Analytics = () => {
  const startDate = useAnalyticsStore((s) => s.startDate);
  const endDate = useAnalyticsStore((s) => s.endDate);
  const setStartDate = useAnalyticsStore((s) => s.setStartDate);
  const setEndDate = useAnalyticsStore((s) => s.setEndDate);
  const setResults = useAnalyticsStore((s) => s.setResults);
  function onStartDate(event: any) {
    setStartDate(event.target.value);
  }
  function onEndDate(event: any) {
    setEndDate(event.target.value);
  }
  function fetchData() {
    axios
      .get(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
      )
      .then((response) => {
        const data = response.data;
        const results = data.data;
        console.log(results);
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <p className="font-bold">Analytics</p>
      <div className="flex flex-row justify-between">
        <div>
          <label htmlFor="startDateId" className="capitalize font-bold mx-2">
            Start date
          </label>
          <input
            id="startDateId"
            type="date"
            data-date="28 04 2021"
            data-date-format="DD MMMM YYYY"
            onChange={onStartDate}
            value={startDate}
          />
          <br />
          <label htmlFor="endDateId" className="capitalize font-bold mx-2">
            end date
          </label>
          <input
            id="endDateId"
            type="date"
            data-date="28 04 2021"
            data-date-format="DD MMMM YYYY"
            onChange={onEndDate}
            value={endDate}
          />
          <button
            onClick={() => fetchData()}
            className="bg-blue-500 text-white px-3 py-2 rounded-xl m-3"
          >
            enter
          </button>
        </div>
      </div>
    </>
  );
};

export default Analytics;
