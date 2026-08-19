export default function TabNav({ active, onChange }) {
  const tabs = [
    { id: 'arrivals', label: 'پروازهای ورودی', icon: 'down' },
    { id: 'departures', label: 'پروازهای خروجی', icon: 'up' },
  ];

  return (
    <div className="flex gap-2 p-1.5 glass-card w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            active === tab.id
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
              : 'text-dark-300 hover:text-white hover:bg-white/5'
          }`}
        >
          {tab.icon === 'down' ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
