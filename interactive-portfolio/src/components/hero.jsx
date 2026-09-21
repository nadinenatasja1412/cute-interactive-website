export default function Hero() {
  return (
    <div className="text-center z-10 mb-8">
      <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
        Welcome to my interactive space
      </span>
      <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
        Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Nadine</span> 👋
      </h1>
      <p className="text-slate-400 text-lg mt-3 max-w-xl mx-auto">
        Seorang pengembang web yang suka merakit antarmuka kreatif, interaktif, dan penuh pengalaman visual.
      </p>
    </div>
  );
}