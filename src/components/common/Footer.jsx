import Image from "next/image";
import svgPaths from "../../../imports/svg";

export default function Footer() {
  return (
    <div className="bg-white w-full overflow-hidden shrink-0 relative h-[752px]">
      <div className="absolute bottom-0 h-full w-full left-1/2 -translate-x-1/2 max-w-[1920px]">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src='images/footer.png' />
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.7)] h-full w-full mix-blend-hard-light" />


      <div className="relative z-10 max-w-[1520px] mx-auto px-8 py-12 h-full flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 text-white mt-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <Image src='/images/logo.png' width={60} height={60} alt='logo' />
            </div>
            <p className="font-['Cyntho_Next:Regular',sans-serif] text-white/90 leading-relaxed">
              These guys have been absolutely outstanding. When I needed them they came through in a big way! I know that if you buy this theme.            </p>
          </div>

          {/* Account Links */}
          <div>
            <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[#f5f5f5] text-xl uppercase mb-6">Account</p>
            <div className="space-y-4 font-['Cyntho_Next:Regular',sans-serif] text-lg">
              <p className="hover:text-[#ffbb15] cursor-pointer transition-colors">Home</p>
              <p className="hover:text-[#ffbb15] cursor-pointer transition-colors">About Us</p>
              <p className="hover:text-[#ffbb15] cursor-pointer transition-colors">Contact Us</p>
            </div>
          </div>

          {/* Legals Links */}
          <div>
            <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[#f5f5f5] text-xl uppercase mb-6">Legals</p>
            <div className="space-y-4 font-['Cyntho_Next:Regular',sans-serif] text-lg">
              <p className="hover:text-[#ffbb15] cursor-pointer transition-colors">Privacy Policy</p>
              <p className="hover:text-[#ffbb15] cursor-pointer transition-colors">Terms & Condition</p>
            </div>
          </div>

          {/* Subscribe Section */}
          <div>
            <p className="font-['Cyntho_Next:SemiBold',sans-serif] text-[#f5f5f5] text-xl uppercase mb-6">Subscribe</p>
            <div className="space-y-4">
              <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded px-4 py-3 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p1b2f5380} fill="#F5F5F5" />
                  <path d={svgPaths.p333e12c0} fill="#F5F5F5" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="bg-transparent outline-none text-white placeholder-white/60 flex-1"
                />
              </div>
              <button className="bg-[#ffbb15] text-[#410c0c] font-['Open_Sans:Regular',sans-serif] uppercase tracking-widest px-8 py-3 rounded hover:bg-[#e5a613] transition-colors w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-white/60 font-['Cyntho_Next:Regular',sans-serif]">
          {/* Social Icons */}
          <div className="flex items-center gap-4 w-fit mx-auto">
            {[
              { path: svgPaths.p21b45980, viewBox: "0 0 30 25" },
              { path: svgPaths.p1a5ebc70, viewBox: "0 0 30 30" },
              { path: svgPaths.pdd08c00, viewBox: "0 0 30 22" },
              { path: svgPaths.p102c9c80, viewBox: "0 0 30 30" },
              { path: svgPaths.p1224d600, viewBox: "0 0 30 25" },
            ].map((icon, index) => (
              <div key={index} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#ffbb15] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox={icon.viewBox}>
                  <path d={icon.path} fill="#F5F5F5" />
                </svg>
              </div>
            ))}
          </div>
        </div>
        <div className=" text-white/60 font-['Cyntho_Next:Regular',sans-serif] ml-auto">

          <p>@2023 For Salone All Rights Reserved.</p>

        </div>
      </div>
    </div>
  );
}