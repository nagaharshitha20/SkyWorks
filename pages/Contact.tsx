import React, { useEffect } from 'react';

const Contact: React.FC = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <div className="min-h-screen bg-[#03070c] text-white selection:bg-[#00ffcc] selection:text-black font-sans antialiased overflow-hidden">

         {/* Background Decorators */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-[#03070c]/0 to-transparent pointer-events-none z-0"></div>
         <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a]/10 via-transparent to-transparent pointer-events-none z-0"></div>

         {/* 1. HERO SECTION (matches "THE ULTRAPORTABLE DRONE FOR THE BEST VIDEO") */}
         <section className="relative pt-32 pb-20 px-4 sm:px-6 z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[70vh]">
            {/* Left: Text & CTA */}
            <div className="w-full md:w-1/2 md:pr-12 relative z-20">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tighter text-white leading-tight">
                  Get In Touch <br />With The Future
               </h1>
               <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md leading-relaxed">
                  SkyVision isn't just an aviation company, it's your partner in aerial innovation. Reach out to coordinate your next industrial fleet deployment.
               </p>
               <button className="px-8 py-4 bg-[#00ffcc] text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,255,204,0.3)]">
                  Send Us a Message
               </button>
               <div className="flex gap-6 mt-12 text-[#00ffcc] text-2xl">
                  <div className="w-10 h-10 rounded-full border border-[#00ffcc]/30 flex items-center justify-center hover:bg-[#00ffcc] hover:text-black transition-colors cursor-pointer">
                     <ion-icon name="logo-twitter"></ion-icon>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#00ffcc]/30 flex items-center justify-center hover:bg-[#00ffcc] hover:text-black transition-colors cursor-pointer">
                     <ion-icon name="logo-instagram"></ion-icon>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#00ffcc]/30 flex items-center justify-center hover:bg-[#00ffcc] hover:text-black transition-colors cursor-pointer">
                     <ion-icon name="logo-linkedin"></ion-icon>
                  </div>
               </div>
            </div>

            {/* Right: Drone Image with outline decorative element */}
            <div className="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center perspective-1000">
               {/* Outline blob / decorative background similar to the image's rounded border */}
               <div className="absolute inset-0 bg-transparent border border-white/10 rounded-[60%] -rotate-12 scale-110 pointer-events-none"></div>
               <div className="absolute inset-4 bg-transparent border border-[#00ffcc]/20 rounded-[50%] rotate-6 scale-100 pointer-events-none"></div>

               <img src="/drone_hero.png" alt="SkyVision Drone" className="relative w-full max-w-md mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-[float_6s_ease-in-out_infinite] z-10" />
            </div>
         </section>

         {/* 2. CONTACT DETAILS / INFO CARDS (Matches "Featured Services") */}
         <section className="py-24 px-4 sm:px-6 relative z-10 w-full overflow-hidden bg-[#02050a] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h3 className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3">Reach Out</h3>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Our Contact Channels</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { icon: 'mail-outline', title: 'Email Address', info: 'hello@skyvision.com', desc: 'Drop us a line anytime.' },
                     { icon: 'call-outline', title: 'Phone Number', info: '+1 (800) 123-4567', desc: 'Mon-Fri from 8am to 5pm.' },
                     { icon: 'location-outline', title: 'Headquarters', info: 'Silicon Valley, CA', desc: '1423 Drone Way, Tech Park' }
                  ].map((item, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/10 hover:border-[#00ffcc]/30 transition-all group shadow-lg">
                        <div className="w-16 h-16 rounded-full bg-[#03070c] border border-white/10 flex items-center justify-center text-2xl text-[#00ffcc] mb-6 group-hover:scale-110 transition-transform">
                           <ion-icon name={item.icon}></ion-icon>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-[#00ffcc] font-medium mb-4">{item.info}</p>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 3. QUICK STATS (Matches "80 65 25 92% stats section") */}
         <section className="py-16 bg-[#03070c] z-10 relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
               <h3 className="text-gray-500 font-bold tracking-widest uppercase text-[10px] mb-10">SUCCESSFUL AERIAL RESOLUTIONS</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
                  {[
                     { num: '24/7', text: 'Global Support' },
                     { num: '<2h', text: 'Response Time' },
                     { num: '50+', text: 'Enterprise Clients' },
                     { num: '99%', text: 'Satisfaction Rate' }
                  ].map((stat, i) => (
                     <div key={i} className="flex flex-col items-center group">
                        <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 group-hover:from-[#00ffcc] group-hover:to-[#3b82f6] transition-all">{stat.num}</span>
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{stat.text}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. FORM SPLIT SECTION (Matches "WE HELP YOU EMBRACE THE FUTURE") */}
         <section className="py-24 px-4 sm:px-6 relative z-10 overflow-hidden bg-[#0a111e]/30">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
               {/* Left: Huge appealing image */}
               <div className="w-full lg:w-1/2 relative group">
                  {/* Outline decorative box mimicking image */}
                  <div className="absolute -inset-4 border-2 border-[#00ffcc]/20 rounded-[2rem] z-0 transition-transform duration-700 group-hover:scale-[1.02]"></div>
                  <div className="absolute inset-0 bg-[#00ffcc]/5 blur-3xl rounded-full z-0 pointer-events-none"></div>
                  <img src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=800&auto=format&fit=crop" alt="Drone Operator" className="w-full h-[500px] object-cover rounded-[2rem] relative z-10 shadow-2xl opacity-90 border border-white/5 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
               </div>

               {/* Right: Contact Form */}
               <div className="w-full lg:w-1/2 relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 tracking-tight">We Help You Embrace<br />The Future</h2>
                  <p className="text-gray-400 text-sm mb-10 max-w-md leading-relaxed">
                     Since 2018, our team of drone experts have advised, built, and supplied drones all over the world. We're your one-stop shop for everything related to remote control aircraft.
                  </p>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                     <div className="flex flex-col sm:flex-row gap-5">
                        <input type="text" placeholder="First Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
                        <input type="text" placeholder="Last Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
                     </div>
                     <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
                     <textarea placeholder="How can we help you?" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors resize-none"></textarea>
                     <button className="px-10 py-4 bg-[#00ffcc] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors w-full sm:w-auto shadow-[0_10px_30px_rgba(0,255,204,0.2)]">
                        Explore More
                     </button>
                  </form>
               </div>
            </div>
         </section>

         {/* 5. DEDICATED TEAM (Matches "OUR DEDICATED TEAM") */}
         <section className="py-24 bg-[#02050a] px-4 sm:px-6 relative z-10 text-center border-t border-white/5">
            <div className="max-w-7xl mx-auto">
               <h3 className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-3">Meet the Experts</h3>
               <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-16 tracking-tight">Our Dedicated Team</h2>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
                  {[
                     { name: 'Sarah Connor', role: 'Support Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' },
                     { name: 'Stephen Humbert', role: 'Sales Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop' },
                     { name: 'Marcus D. Hoffman', role: 'Tech Operations', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' }
                  ].map((member, i) => (
                     <div key={i} className="flex flex-col items-center group">
                        <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white/5 group-hover:border-[#00ffcc]/50 transition-colors relative">
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                           <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        <h4 className="text-white font-bold text-lg mb-1">{member.name}</h4>
                        <span className="text-[#00ffcc] text-[10px] uppercase font-black tracking-widest bg-[#00ffcc]/5 px-3 py-1 rounded-full mt-1 mb-4">{member.role}</span>
                        <div className="flex gap-4 text-gray-500 text-lg border-t border-white/10 pt-4 w-1/2 justify-center">
                           <ion-icon name="logo-twitter" className="hover:text-white cursor-pointer transition-colors"></ion-icon>
                           <ion-icon name="logo-linkedin" className="hover:text-white cursor-pointer transition-colors"></ion-icon>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. WHAT OUR CLIENTS SAY (Matches bottom section) */}
         <section className="py-24 bg-[#03070c] px-4 sm:px-6 relative z-10 text-center border-t border-white/5">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
               <div className="w-full md:w-1/3 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-2">What Our Clients<br />Say</h2>
                  <p className="text-[#00ffcc] font-medium text-sm">Welcome to the personal presentation.</p>
               </div>

               <div className="w-full md:w-2/3 bg-white/5 border border-white/10 rounded-3xl p-8 relative">
                  <ion-icon name="quote" className="absolute top-4 left-4 text-4xl text-[#00ffcc]/20"></ion-icon>
                  <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed pl-6">
                     "SkyVision provides unparalleled access and highly customized 3D data-gathering solutions. It's safe, reliable maneuverability, highly capable camera unit, and robust software made it the best choice."
                  </p>
                  <div className="flex items-center gap-4 pl-6">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Client" className="w-12 h-12 rounded-full border border-white/20" />
                     <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">David C. Hull</h4>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest text-[#00ffcc]">Facebook - Twitter - LinkedIn</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </div>
   );
};

export default Contact;
