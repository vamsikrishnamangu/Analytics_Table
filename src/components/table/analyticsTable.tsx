import { useAnalyticsStore, ImergedData } from "@/store/useAnalyticsStore";
import { FaFilter } from "react-icons/fa";
import React, { MouseEventHandler, useEffect, useState } from "react";

type SortOrder = "ascn" | "desc";
const AnalyticsTable = ({ appData }: any) => {
  const [clickedFilter, setClickedFilter] = useState(false);
  const [sortKey, setSortKey] = useState<string>("app_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  const mergedData = useAnalyticsStore((s) => s.mergedData);
  const setMergedData = useAnalyticsStore((s) => s.setMergedData);
  const results = useAnalyticsStore((s) => s.results);
  const data = appData.data;
  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: ImergedData[];
    sortKey: string;
    reverse: boolean;
  }) {
    if (!tableData) return tableData;
    const sortedData = tableData.sort((a: any, b: any) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });
    if (reverse) {
      return sortedData.reverse();
    }
    return sortedData;
  }
  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: string;
    columnKey: any;
    sortKey: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button onClick={onClick}>
        <FaFilter />
      </button>
    );
  }
  function sortedData() {
    const sorted = sortData({
      tableData: mergedData,
      sortKey,
      reverse: sortOrder === "desc",
    });
    return sorted.map(({ app_id, ...rest }) => rest);
  }
  const headers = [
    { key: "date", label: "Date" },
    { key: "app_name", label: "App Name" },
    { key: "requests", label: "Requests" },
    { key: "responses", label: "Responses" },
    { key: "impressions", label: "Impressions" },
    { key: "clicks", label: "Clicks" },
    { key: "revenue", label: "Revenue" },
    { key: "fill rate", label: "Fill Rate" },
    { key: "CTR", label: "CTR" },
  ];
  console.log("results: ", results);
  console.log("data:", data);
  useEffect(() => {
    const merged = results.map((item1) => {
      const i = data.find((item2: any) => item2?.app_id === item1?.app_id);
      console.log("i", i);
      return { ...item1, app_name: i ? i.app_name : "" };
    });
    setClickedFilter(!clickedFilter);
    setMergedData(merged);
  }, [results, data, setMergedData]);
  function changeSort(key: any) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
  return (
    <>
      <table className="border border-gray-500 max-w-screen-md">
        <thead>
          <tr className="border-b-2 border-gray-500 px-2">
            {headers.map((e) => {
              return (
                <td key={e.key}>
                  {e.label}
                  <SortButton
                    columnKey={e.key}
                    onClick={() => changeSort(e.key)}
                    {...{
                      sortKey,
                      sortOrder,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>
        {sortedData().map((result: any) => {
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
            <React.Fragment key={result.app_id}>
              <tr>
                <td className="px-2">{formattedDate}</td>
                <td className="px-2">{result.app_name}</td>
                <td className="px-2">{result.requests}</td>
                <td className="px-2">{result.responses}</td>
                <td className="px-2">{result.impressions}</td>
                <td className="px-2">{result.clicks}</td>
                <td className="px-2">${result.revenue.toFixed(2)}</td>
                <td className="px-2">{fillRate.toFixed(2)}%</td>
                <td className="px-2">{CTR.toFixed(2)}%</td>
              </tr>
            </React.Fragment>
          );
        })}
      </table>
    </>
  );
};

export default AnalyticsTable;
