import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import StatsBar from "@/components/StatsBar";
import FlightList from "@/components/FlightList";

export default function Home() {
  const [activeTab, setActiveTab] = useState("arrivals");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchFlights = useCallback(async (type) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/flights?type=${type}&limit=25`);
      const data = await res.json();

      if (data.error) {
        console.error("API Error:", data.error);
        setFlights([]);
      } else {
        setFlights(data.flights || []);
      }
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlights(activeTab);
  }, [activeTab, fetchFlights]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFlights(activeTab);
    }, 60000);
    return () => clearInterval(interval);
  }, [activeTab, fetchFlights]);

  const handleRefresh = () => {
    fetchFlights(activeTab);
  };

  return (
    <>
      <Head>
        <title>پروازهای فرودگاه امام خمینی | IKAC Aviation</title>
        <meta
          name="description"
          content="اطلاعات لحظه‌ای پروازهای ورودی و خروجی فرودگاه بین‌المللی امام خمینی (ره)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>"
        />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          {/* Tabs */}
          <div className="mb-6">
            <TabNav active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Stats */}
          <div className="mb-6 animate-slide-up">
            <StatsBar flights={flights} type={activeTab} />
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-dark-400 text-xs">
              {lastUpdate
                ? `آخرین به‌روزرسانی: ${lastUpdate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                : ""}
            </p>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-dark-300 hover:text-white text-xs font-medium transition-all duration-300 disabled:opacity-50"
            >
              <svg
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {loading ? "در حال بارگذاری..." : "به‌روزرسانی"}
            </button>
          </div>

          {/* Flight List */}
          <FlightList flights={flights} type={activeTab} loading={loading} />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-dark-500 text-xs">
              طراحی و توسعه با ❤️ | اطلاعات پرواز توسط{" "}
              <a
                href="https://rahvan.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                'گروه رهوان'
              </a>{" "}
              | فرودگاه بین‌المللی امام خمینی (ره)
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
