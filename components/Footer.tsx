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
    <a href={href} onClick={handleNavigate} className="text-sky-gray hover:text-sky-light transition-colors duration-200">{children}</a>
  );

  const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sky-gray hover:text-sky-blue transition-colors duration-200">
      {children}
    </a>
  );

  return (
    <footer className="bg-sky-dark border-t border-sky-light/10 text-sky-light">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tighter text-sky-light">SKYVISION</h3>
            <p className="text-sky-gray text-sm">Revolutionizing the Skies with Precision and Power.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="font-semibold text-sky-light tracking-wider uppercase">Products</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><FooterLink href="#shop/x1">SkyVision X1</FooterLink></li>
              <li><FooterLink href="#shop/s1">SkyVision S1</FooterLink></li>
              <li><FooterLink href="#shop/a1">SkyVision A1</FooterLink></li>
              <li><FooterLink href="#shop">All Drones</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sky-light tracking-wider uppercase">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><FooterLink href="#about">About Us</FooterLink></li>
              <li><FooterLink href="#careers">Careers</FooterLink></li>
              <li><FooterLink href="#press">Press</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sky-light tracking-wider uppercase">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><FooterLink href="#contact">Contact Us</FooterLink></li>
              <li><FooterLink href="#faq">FAQ</FooterLink></li>
              <li><FooterLink href="#downloads">Downloads</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sky-light tracking-wider uppercase">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><FooterLink href="#privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="#patents">Patents & Certifications</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-sky-light/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-sky-gray">&copy; {new Date().getFullYear()} Skyvision Industries. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <SocialIcon href="https://twitter.com">
              <span className="sr-only">Twitter</span>
              <ion-icon name="logo-twitter" className="text-2xl"></ion-icon>
            </SocialIcon>
            <SocialIcon href="https://youtube.com">
              <span className="sr-only">YouTube</span>
              <ion-icon name="logo-youtube" className="text-2xl"></ion-icon>
            </SocialIcon>
            <SocialIcon href="https://instagram.com">
              <span className="sr-only">Instagram</span>
              <ion-icon name="logo-instagram" className="text-2xl"></ion-icon>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};