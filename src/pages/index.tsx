import Analytics from "../components/analytics/analytics";
import AnalyticsTable from "../components/table/analyticsTable";

export default function Home({ appData }: any) {
  return (
    <div className="h-full border-l-[4rem] border-indigo-800 p-4">
      <Analytics />
      <AnalyticsTable appData={appData} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://go-dev.greedygame.com/v3/dummy/apps`);
  const appData = await res.json();
  console.log("data", appData);
  return { props: { appData } };
}
