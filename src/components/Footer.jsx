import { Globe, Mail, MessageCircle, Phone } from "lucide-react";

function Footer() {
  return (
    <section className="footer-section bg-black text-milk relative z-10 w-full overflow-hidden">
      <div className="2xl:h-[80dvh] relative md:pt-[15vh] pt-[10vh] pb-5">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/footer-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="overflow-hidden z-10 w-full">
          <h1 className="general-title text-center text-milk py-5 uppercase tracking-tighter">
            #AIPOWERED
          </h1>
        </div>

        <div className="flex-center gap-5 relative z-10 md:mt-16 mt-5">
          {[Globe, Mail, MessageCircle, Phone].map((Icon, idx) => (
            <div
              key={idx}
              className="social-btn group border-milk/20 hover:bg-milk/10 cursor-pointer flex-center size-14 md:size-[5vw] rounded-full transition-all duration-300"
            >
              <Icon
                size={24}
                className="text-milk group-hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>

        <div className="mt-32 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between font-paragraph md:text-lg font-medium max-w-[1600px] mx-auto w-full">
          <div className="flex flex-wrap md:flex-nowrap items-start md:gap-24 gap-10">
            <div>
              <p className="font-bold mb-4 font-sans text-xl uppercase">
                Platform
              </p>
              <div className="opacity-70 space-y-2">
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  Intelligence
                </p>
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  Analytics
                </p>
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  Coaching
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-4 font-sans text-xl uppercase">
                Company
              </p>
              <div className="opacity-70 space-y-2">
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  About Us
                </p>
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  Careers
                </p>
                <p className="cursor-pointer hover:opacity-100 transition-opacity">
                  Contact
                </p>
              </div>
            </div>
          </div>

          <div className="md:max-w-lg w-full">
            <p className="text-xl md:text-2xl font-bold font-sans uppercase mb-6 leading-tight">
              Get Exclusive Early Access and Stay Informed About Product
              Updates.
            </p>
            <div className="flex justify-between items-center border-b border-milk/30 py-4 transition-colors focus-within:border-milk">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none placeholder:font-sans placeholder:text-milk/50 text-2xl font-sans"
              />
              <button className="flex-center size-10 rounded-full bg-light-brown text-dark-brown hover:scale-105 transition-transform">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright © 2026 AI Agency - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p className="cursor-pointer hover:text-white transition-colors">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-white transition-colors">
              Terms of Service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
