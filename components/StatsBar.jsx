export default function StatsBar({ flights, type }) {
  const total = flights.length;
  const active = flights.filter((f) => f.status === 'active').length;
  const landed = flights.filter((f) => f.status === 'landed').length;
  const delayed = flights.filter((f) => (type === 'departures' ? f.departure.delay : f.arrival.delay) > 0).length;

  const stats = [
    { label: 'کل پروازها', value: total, color: 'text-white' },
    { label: 'در حال پرواز', value: active, color: 'text-emerald-400' },
    { label: type === 'arrivals' ? 'فرود آمده' : 'خارج شده', value: landed, color: 'text-green-400' },
    { label: 'با تأخیر', value: delayed, color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-4 text-center">
          <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="text-dark-400 text-xs mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
