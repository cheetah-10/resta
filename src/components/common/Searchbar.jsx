import svgPaths from '../../../imports/svg';

export default function SearchBar() {
  return (
    <div className="flex w-full max-w-282 h-17.5">
      <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid rounded-bl rounded-tl flex-1 flex items-center px-6">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.pb406a00} fill="#868686" />
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className="font-['Cyntho_Next:Regular',sans-serif] text-[#868686] text-2xl outline-none bg-transparent w-full"
          />
        </div>
      </div>
      <button className="bg-[#ffbb15] border border-[rgba(255,187,21,0.2)] border-solid rounded-br rounded-tr px-12 flex items-center justify-center hover:bg-[#e5a613] transition-colors">
        <p className="font-['Open_Sans:SemiBold',sans-serif] text-white text-xl">Search</p>
      </button>
    </div>
  );
}