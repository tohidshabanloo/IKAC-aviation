export default function StatusBadge({ status }) {
  const config = {
    scheduled: {
      label: 'برنامه‌ریزی شده',
      bg: 'bg-blue-500/15',
      text: 'text-blue-400',
      dot: 'bg-blue-400',
    },
    active: {
      label: 'در حال پرواز',
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400',
    },
    landed: {
      label: 'فرود آمده',
      bg: 'bg-green-500/15',
      text: 'text-green-400',
      dot: 'bg-green-400',
    },
    cancelled: {
      label: 'لغو شده',
      bg: 'bg-red-500/15',
      text: 'text-red-400',
      dot: 'bg-red-400',
    },
    incident: {
      label: 'حادثه',
      bg: 'bg-orange-500/15',
      text: 'text-orange-400',
      dot: 'bg-orange-400',
    },
    diverted: {
      label: 'تغییر مسیر',
      bg: 'bg-amber-500/15',
      text: 'text-amber-400',
      dot: 'bg-amber-400',
    },
  };

  const s = config[status] || config.scheduled;

  return (
    <span className={`status-badge ${s.bg} ${s.text} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
      {s.label}
    </span>
  );
}
