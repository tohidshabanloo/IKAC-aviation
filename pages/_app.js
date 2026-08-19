import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-dark-950 font-vazir">
      <Component {...pageProps} />
    </div>
  );
}
