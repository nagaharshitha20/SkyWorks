import React from 'react';

export const Footer: React.FC = () => {
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) {
      window.location.hash = targetHash;
    }
  };

  const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
      href={href}
      onClick={handleNavigate}
      className="block text-left text-gray-mid hover:text-yellow transition-colors duration-200 py-1 text-sm"
    >
      {children}
    </a>
  );

  const SocialIcon: React.FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-mid hover:bg-yellow hover:text-black hover:border-yellow transition-all duration-200"
    >
      <ion-icon name={icon} className="text-lg"></ion-icon>
    </a>
  );

  return (
    <footer className="bg-white border-t-[3px] border-yellow text-black">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto pt-14 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1 flex flex-col items-start gap-4">
            <h3 className="text-2xl font-condensed font-extrabold tracking-tight text-black">
              SKY<span className="text-yellow">VISION</span>
            </h3>
            <p className="text-gray-mid text-sm leading-relaxed max-w-[220px]">
              Revolutionizing the skies with precision-engineered aerial systems.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <SocialIcon href="https://twitter.com" label="Twitter" icon="logo-twitter" />
              <SocialIcon href="https://youtube.com" label="YouTube" icon="logo-youtube" />
              <SocialIcon href="https://instagram.com" label="Instagram" icon="logo-instagram" />
              <SocialIcon href="https://linkedin.com" label="LinkedIn" icon="logo-linkedin" />
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-black tracking-widest uppercase text-[11px] mb-4">Products</h4>
            <ul className="space-y-1 list-none p-0 m-0">
              <li><FooterLink href="#shop/x1">SkyVision X1</FooterLink></li>
              <li><FooterLink href="#shop/s1">SkyVision S1</FooterLink></li>
              <li><FooterLink href="#shop/a1">SkyVision A1</FooterLink></li>
              <li><FooterLink href="#shop">All Drones</FooterLink></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-black tracking-widest uppercase text-[11px] mb-4">Company</h4>
            <ul className="space-y-1 list-none p-0 m-0">
              <li><FooterLink href="#about">About Us</FooterLink></li>
              <li><FooterLink href="#careers">Careers</FooterLink></li>
              <li><FooterLink href="#press">Press</FooterLink></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-black tracking-widest uppercase text-[11px] mb-4">Support</h4>
            <ul className="space-y-1 list-none p-0 m-0">
              <li><FooterLink href="#contact">Contact Us</FooterLink></li>
              <li><FooterLink href="#faq">FAQ</FooterLink></li>
              <li><FooterLink href="#downloads">Downloads</FooterLink></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-black tracking-widest uppercase text-[11px] mb-4">Legal</h4>
            <ul className="space-y-1 list-none p-0 m-0">
              <li><FooterLink href="#privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="#patents">Patents &amp; Certifications</FooterLink></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-mid text-xs">
          <p>© {new Date().getFullYear()} Skyvision Industries. All rights reserved.</p>
          <p className="text-[11px] tracking-wide uppercase font-bold text-gray-mid">
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  );
};