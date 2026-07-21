'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      )
    },
    { 
      name: 'TikTok', 
      href: 'https://tiktok.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    }
  ];

  const archiveLinks = [
    { label: 'Silver Jewelry', href: '/products' },
    { label: 'Artificial Pieces', href: '/products' },
    { label: 'Leather Goods', href: '/products' }
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5% 0px" }}
      variants={containerVariants}
      className="bg-black text-white border-t border-white/10 select-none relative overflow-hidden"
    >
      {/* BACKGROUND AMBIENT GLOW EFFECTS */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-antique-champagne/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 relative z-10">
        
        {/* Big Brand Header Strip */}
        <motion.div 
          variants={itemVariants}
          className="border-b border-white/10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="font-display-hero text-[13vw] sm:text-[85px] md:text-[105px] lg:text-[130px] leading-none tracking-[0.02em] uppercase text-white font-black select-none hover:text-antique-champagne transition-colors duration-700">
            SHOMICOR
          </h2>
          <span className="font-label-caps text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold whitespace-nowrap mb-3 hover:text-white/70 transition-colors duration-300">
            CURATED CRAFTSMANSHIP / ARCHIVE {currentYear}
          </span>
        </motion.div>

        {/* Main Metadata Informational Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-12">
          
          {/* Manifesto Column */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-4 group"
          >
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-white font-bold uppercase border-b border-white/5 pb-2 group-hover:border-white/20 transition-colors duration-300">
              OUR MANIFESTO
            </h3>
            <p className="font-body-lg text-[13px] text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
              An independent design house exploring architectural boundaries through curated craftsmanship, pure metals, and fine art pieces.
            </p>
          </motion.div>

          {/* The Archive Category Navigation Column */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-4 group"
          >
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-white font-bold uppercase border-b border-white/5 pb-2 group-hover:border-white/20 transition-colors duration-300">
              THE ARCHIVE
            </h3>
            <div className="flex flex-col items-start gap-3">
              {archiveLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  className="font-nav-link text-[12px] text-white/50 hover:text-antique-champagne uppercase tracking-wider relative group/foot py-0.5 block transition-colors duration-300"
                >
                  {link.label}
                  <motion.span 
                    initial={{ scaleX: 0 }} 
                    whileHover={{ scaleX: 1 }} 
                    transition={{ duration: 0.4, ease: "easeOut" }} 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-left" 
                  />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Concierge & Contact Channel Column */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-4 group"
          >
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-white font-bold uppercase border-b border-white/5 pb-2 group-hover:border-white/20 transition-colors duration-300">
              CONNECT WITH US
            </h3>
            <div className="flex flex-col items-start gap-3">
              <a 
                href="tel:+923010544620" 
                className="font-nav-link text-[14px] font-bold text-white hover:text-antique-champagne relative group/foot py-0.5 block transition-colors duration-300 tracking-wide"
              >
                +92 301 0544620
                <motion.span 
                  initial={{ scaleX: 0 }} 
                  whileHover={{ scaleX: 1 }} 
                  transition={{ duration: 0.4, ease: "easeOut" }} 
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-left" 
                />
              </a>
              <a 
                href="mailto:concierge@shomicor.com" 
                className="font-nav-link text-[12px] text-white/50 hover:text-antique-champagne uppercase tracking-wider relative group/foot py-0.5 block transition-colors duration-300"
              >
                CONCIERGE@SHOMICOR.COM
                <motion.span 
                  initial={{ scaleX: 0 }} 
                  whileHover={{ scaleX: 1 }} 
                  transition={{ duration: 0.4, ease: "easeOut" }} 
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-left" 
                />
              </a>
              <p className="font-body-lg text-[10px] tracking-widest text-white/40 uppercase font-medium mt-1 hover:text-white/60 transition-colors duration-300">
                MON — FRI / 09:00 — 18:00 GMT
              </p>
            </div>
          </motion.div>

          {/* Social Profiles Index Column */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-4 group"
          >
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-white font-bold uppercase border-b border-white/5 pb-2 group-hover:border-white/20 transition-colors duration-300">
              SOCIAL MEDIAS
            </h3>
            <div className="flex items-center gap-6 pt-1">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ 
                    scale: 1.15, 
                    color: "rgba(230,187,119,1)",
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow Shomicor on ${social.name}`}
                  className="text-white/40 hover:text-antique-champagne transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Horizon Base Copyright Bar Strip */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          {/* Brand Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
            <motion.div 
              whileHover={{ rotate: 360 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              className="relative w-12 h-12 border border-white/10 bg-[#0a0a0a] flex items-center justify-center overflow-hidden flex-shrink-0 rounded-sm hover:border-antique-champagne/30 transition-colors duration-300"
            >
              <Image 
                src="/shomicor_logo.png" 
                alt="Shomicor Brand Signature Logo Mark" 
                fill 
                sizes="48px"
                className="object-contain p-1.5 filter invert hover:filter-none transition-all duration-500"
              />
            </motion.div>
            <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium hover:text-white/70 transition-colors duration-300">
              © {currentYear} SHOMICOR. ALL RIGHTS RESERVED.
            </span>
          </div>
          
   {/* Designer Credit */}
<motion.div 
  whileHover="hover"
  whileTap={{ scale: 0.98 }}
  variants={{
    hover: { 
      borderColor: "rgba(230,187,119,0.3)",
      boxShadow: "0 4px 15px -5px rgba(230,187,119,0.15)",
      backgroundColor: "rgba(255,255,255,0.03)"
    }
  }}
  initial={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  className="flex items-center gap-2 px-4 py-2 border rounded-sm opacity-75 hover:opacity-100 transition-opacity duration-300 relative group overflow-hidden select-none"
>
  {/* Live Status Active Radar Dot Indicator */}
  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
    <motion.span 
      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inline-flex h-full w-full rounded-full bg-antique-champagne/60 opacity-75"
    />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-antique-champagne" />
  </span>

  {/* Typography Matrix */}
  <span className="font-label-caps text-[9px] tracking-[0.25em] text-white/40 font-medium uppercase relative z-10 flex items-center gap-1.5">
    DESIGN BY{" "}
    <a 
      href="https://saadmirza.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white/80 font-bold hover:text-antique-champagne tracking-widest transition-colors duration-300 relative py-0.5 block"
    >
      SAAD MIRZA
      
      {/* Absolute Underline Vector Track */}
      <motion.div 
        variants={{
          hover: { scaleX: 1 }
        }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
      />
    </a>
  </span>
</motion.div>

          
          {/* Legal Links */}
          <div className="flex gap-6">
            <Link 
              href="/terms" 
              className="font-label-caps text-[10px] tracking-[0.15em] text-white/40 hover:text-white uppercase font-medium relative group/foot py-0.5 block transition-colors duration-300"
            >
              TERMS OF SERVICE
              <motion.span 
                initial={{ scaleX: 0 }} 
                whileHover={{ scaleX: 1 }} 
                transition={{ duration: 0.4, ease: "easeOut" }} 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left" 
              />
            </Link>
            <Link 
              href="/privacy" 
              className="font-label-caps text-[10px] tracking-[0.15em] text-white/40 hover:text-white uppercase font-medium relative group/foot py-0.5 block transition-colors duration-300"
            >
              PRIVACY REGULATION
              <motion.span 
                initial={{ scaleX: 0 }} 
                whileHover={{ scaleX: 1 }} 
                transition={{ duration: 0.4, ease: "easeOut" }} 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left" 
              />
            </Link>
          </div>
        </motion.div>

        {/* BOTTOM DECORATIVE LINE */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-antique-champagne/20 to-transparent"
        />
      </div>
    </motion.footer>
  );
}