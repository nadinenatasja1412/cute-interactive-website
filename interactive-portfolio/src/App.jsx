import Hero from './components/hero';

export default function App() {
  return (
    <main className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Bagian Home: Teks Perkenalan */}
      <Hero />
      
      {/* Canvas Area untuk Portofolio / Karakter Nanti */}
      <div className="w-full max-w-4xl h-[400px] bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative shadow-2xl">
        <p className="text-slate-500 text-sm animate-pulse">
          [ Area Canvas Karakter Interaktif akan ada di sini ]
        </p>
      </div>
      
    </main>
  );
}