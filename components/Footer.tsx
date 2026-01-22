
import React from 'react';

const Footer: React.FC = () => {
  const links = [
    { label: "© Brave Software", href: "#" },
    { label: "Advertise", href: "#" },
    { label: "API", href: "#" },
    { label: "News", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Report a security issue", href: "#" },
  ];

  return (
    <footer className="w-full py-8 text-neutral-500 text-xs flex flex-wrap justify-center gap-x-6 gap-y-2 mt-auto">
      {links.map((link, idx) => (
        <a key={idx} href={link.href} className="hover:text-white transition-colors duration-200">
          {link.label}
        </a>
      ))}
    </footer>
  );
};

export default Footer;
