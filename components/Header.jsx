export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              <span className="gradient-text">پروازهای فرودگاه</span>
              <br />
              <span className="text-white">امام خمینی</span>
            </h1>
            <p className="mt-3 text-dark-300 text-sm md:text-base max-w-lg mx-auto">
              اطلاعات لحظه‌ای پروازهای ورودی و خروجی فرودگاه بین‌المللی امام خمینی (ره)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-dark-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            به‌روزرسانی خودکار هر ۶۰ ثانیه
          </div>
        </div>
      </div>
    </header>
  );
}
