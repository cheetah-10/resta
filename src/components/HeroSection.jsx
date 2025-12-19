import svgPaths from '../../imports/svg';
export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] lg:min-h-[800px] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src='/images/header.png' 
          alt="Restaurant food" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-12 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Main Title */}
          <div className="relative mb-8">
            <div className="relative">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[160px] font-extrabold text-white leading-tight">
                FOOD
              </h1>
              <div className="absolute right-0 top-0 md:top-16 text-2xl md:text-[35px] text-white/50">
                CAN
              </div>
            </div>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[145px] font-extrabold text-white leading-tight">
                MOOD
              </h1>
              <div className="absolute right-0 bottom-0 md:bottom-4 text-2xl md:text-[35px] text-white/50">
                CHANGE
              </div>
              {/* Arrow decoration */}
              <div className="absolute  right-12 top-[10%] -translate-y-1/2 w-16 h-20 hidden lg:block">
                <svg className="w-full h-full" fill="white" viewBox="0 0 115 153">
                  <path d={svgPaths.p268e6b00} />
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-base md:text-lg lg:text-[22px] text-white leading-relaxed mb-8 max-w-2xl">
            <p className="mb-2">Welcome to our exquisite salon, where beauty meets expertise.</p>
            <p className="mb-2">Step into a world of luxury and indulgence, where we are</p>
            <p className="mb-2">dedicated to enhancing your natural beauty and leaving</p>
            <p>you feeling radiant.</p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row max-w-xl gap-2 sm:gap-0">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-8 py-4 sm:rounded-l-full rounded-full sm:rounded-r-none bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#ffbb15]"
              />
            </div>
            <button className="px-8 z-10  py-4 bg-[#ffbb15] rounded-full sm:ml-[-50px] hover:bg-[#e5a614] transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                <path d={svgPaths.p26fbef00} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};