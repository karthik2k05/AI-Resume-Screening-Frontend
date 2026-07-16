import { Link } from "react-router-dom";
import {
  ScanSearch,
  Share2,
  Link2,
  Code,
  Mail,
} from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "#" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "User Portals",
    links: [
      { label: "Admin", to: "/login/admin" },
      { label: "HR Team", to: "/login/hr" },
      { label: "Candidate", to: "/login/candidate" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Share2, label: "Share", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: Code, label: "GitHub", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

// Footer intentionally uses a fixed dark navy palette regardless of the
// site's darkMode toggle — a deliberate contrast band that anchors the page.
export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 overflow-hidden">
      {/* Accent glow, ties back to the Hero/Features treatment */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm shadow-blue-600/30">
                <ScanSearch size={18} className="text-white" strokeWidth={2.25} />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                ResumeIQ<span className="text-blue-500">AI</span>
              </h2>
            </div>

            <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
              AI-powered resume screening that helps recruiting teams find the
              right candidate faster.
            </p>

            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                {group.title}
              </h3>
              <ul className="space-y-3 mt-5">
                {group.links.map((link) =>
                  link.to ? (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 ResumeIQ AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
