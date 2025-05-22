
const MenuOverlay = ({ onStart }) => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
      <div className="bg-gradient-to-b from-gray-900/60 to-gray-800/60 p-8 rounded-2xl text-white text-center flex flex-col items-center space-y-6 backdrop-blur-sm shadow-2xl border border-white/10 pointer-events-auto transform -translate-y-1/2">
        <h1 className="text-5xl font-bold animate-float">
          <span className="bg-gradient-to-r from-gray-50 to-slate-100 bg-clip-text text-transparent">
            Elegancka<br/>Gierka
          </span>
          {' '}🚗
        </h1>
        <button
          onClick={onStart}
          className="px-8 py-4 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-xl text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/30"
        >
          START WYŚCIGU
        </button>
      </div>
    </div>
  );

export default MenuOverlay;
