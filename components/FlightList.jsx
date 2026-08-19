import StatusBadge from './StatusBadge';

function formatTime(isoString) {
  if (!isoString) return '--:--';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    return '--:--';
  }
}

function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('fa-IR', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function FlightCard({ flight, type }) {
  const isDeparture = type === 'departures';
  const main = isDeparture ? flight.arrival : flight.departure;
  const other = isDeparture ? flight.departure : flight.arrival;
  const delayMinutes = isDeparture ? flight.departure.delay : flight.arrival.delay;

  return (
    <div className="flight-row animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Flight Info */}
        <div className="flex items-center gap-3 md:w-48 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">{flight.flight_number}</p>
            <p className="text-dark-400 text-xs">{flight.airline}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex-1 flex items-center gap-3">
          <div className="text-center min-w-[60px]">
            <p className="text-white font-bold text-lg">{other.iata}</p>
            <p className="text-dark-400 text-xs truncate max-w-[80px]">{other.airport}</p>
          </div>
          
          <div className="flex-1 flex items-center gap-2 px-2">
            <div className="flex-1 h-px bg-gradient-to-l from-primary-500/50 to-transparent relative">
              <div className={`absolute top-1/2 ${isDeparture ? 'right-0' : 'left-0'} -translate-y-1/2 w-2 h-2 rounded-full ${flight.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-primary-400'}`} />
            </div>
            <div className="shrink-0">
              <svg className={`w-6 h-6 text-primary-400 ${isDeparture ? 'rotate-0' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-transparent relative">
              <div className={`absolute top-1/2 ${isDeparture ? 'left-0' : 'right-0'} -translate-y-1/2 w-2 h-2 rounded-full ${flight.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-primary-400'}`} />
            </div>
          </div>

          <div className="text-center min-w-[60px]">
            <p className="text-white font-bold text-lg">IKA</p>
            <p className="text-dark-400 text-xs">تهران</p>
          </div>
        </div>

        {/* Time & Status */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-center">
            <p className="text-xs text-dark-400 mb-1">{isDeparture ? 'حرکت' : 'رسیدن'}</p>
            <p className="text-white font-mono font-bold text-sm">
              {formatTime(isDeparture ? flight.departure.scheduled : flight.arrival.scheduled)}
            </p>
            {delayMinutes > 0 && (
              <p className="text-red-400 text-xs mt-0.5">+{delayMinutes} دقیقه تأخیر</p>
            )}
          </div>

          <div className="text-center hidden md:block">
            <p className="text-xs text-dark-400 mb-1">ترمینال</p>
            <p className="text-white font-bold text-sm">{main.terminal || '-'}</p>
          </div>

          <div className="text-center hidden lg:block">
            <p className="text-xs text-dark-400 mb-1">هواپیما</p>
            <p className="text-white font-bold text-sm">{flight.aircraft}</p>
          </div>

          <StatusBadge status={flight.status} />
        </div>
      </div>
    </div>
  );
}

export default function FlightList({ flights, type, loading }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="glass-card p-5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/5 rounded w-1/3" />
                <div className="h-3 bg-white/5 rounded w-1/4" />
              </div>
              <div className="h-6 w-16 bg-white/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-800/50 flex items-center justify-center">
          <svg className="w-8 h-8 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p className="text-dark-300 font-medium">پروازی یافت نشد</p>
        <p className="text-dark-500 text-sm mt-1">در حال حاضر پروازی در این دسته‌بندی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {flights.map((flight, index) => (
        <FlightCard key={`${flight.flight_number}-${index}`} flight={flight} type={type} />
      ))}
    </div>
  );
}
