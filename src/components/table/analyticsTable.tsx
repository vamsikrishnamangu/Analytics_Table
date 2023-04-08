import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
const AnalyticsTable = ({ appData }: any) => {
  const [sortedData, setSortedData] = useState([]);
  const [clickedFilter, setClickedFilter] = useState(false);
  console.log("appData", appData.data);
  const results = useAnalyticsStore((s) => s.results);
  function handleSortChange(appData: any) {
    const ascending = appData.map((each: any) => each.app_name).sort();
    console.log("ascending", ascending);
    setSortedData(ascending);
    setClickedFilter(!clickedFilter);
  }

  return (
    <>
      {results?.map((result: any) => {
        const matchingApp = appData.data.find(
          (app: any) => app.app_id === result.app_id
        );
        const dateString = result.date;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString("en-us", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const fillRate = (result?.requests / result?.responses) * 100;
        const CTR = (result?.clicks / result?.impressions) * 100;
        return (
          <>
            <table
              key={result.app_id}
              className="border border-gray-500 max-w-screen-md"
            >
              <tr className="border-b-2 border-gray-500">
                <th className="px-2">Date</th>
                <th className="px-2">
                  App Name
                  <button
                    onClick={() => handleSortChange(appData.data)}
                    className="px-2"
                  >
                    <FaFilter />
                  </button>
                </th>
                <th className="px-2">AD Request</th>
                <th className="px-2">AD Response</th>
                <th className="px-2">Impression</th>
                <th className="px-2">Clicks</th>
                <th className="px-2">Revenue</th>
                <th className="px-2">Fill Rate</th>
                <th className="px-2">CTR</th>
              </tr>
              <tr className="border-b-2  border-gray-500"></tr>
              <tr>
                <td className="px-2">{formattedDate}</td>
                <td className="px-2">
                  {matchingApp && clickedFilter
                    ? matchingApp.app_name
                    : sortedData}
                </td>
                <td className="px-2">{result.requests}</td>
                <td className="px-2">{result.responses}</td>
                <td className="px-2">{result.impressions}</td>
                <td className="px-2">{result.clicks}</td>
                <td className="px-2">${result.revenue.toFixed(2)}</td>
                <td className="px-2">{fillRate.toFixed(2)}%</td>
                <td className="px-2">{CTR.toFixed(2)}%</td>
              </tr>
            </table>
          </>
        );
      })}
    </>
  );
};

export default AnalyticsTable;
