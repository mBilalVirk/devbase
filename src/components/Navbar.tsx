import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDevBase } from "../context/DevBaseContext";
import { Search, Sun, Moon, User, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme, user, setSearchOpen } = useDevBase();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", path: "/" },
    { label: "HTML & CSS", path: "/html" },
    { label: "Languages", path: "/languages" },
    { label: "Code Snippets", path: "/snippets" },
    { label: "Learning Paths", path: "/learning-paths" },
    { label: "Articles", path: "/articles" },
    { label: "Playground", path: "/playground" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path === "/articles") {
      return (
        location.pathname === "/articles" ||
        location.pathname.startsWith("/articles/")
      );
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const goTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <button
          onClick={() => goTo("/")}
          className="text-left group flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          aria-label="DevBase home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-base shadow-sm shadow-indigo-500/20">
            &lt;/&gt;
          </div>

          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors whitespace-nowrap">
            DevBase
          </span>
        </button>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);

            return (
              <button
                key={link.path}
                onClick={() => goTo(link.path)}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
                  active
                    ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-500 after:rounded-full"
                    : `text-slate-300 ${
                        theme === "dark"
                          ? "hover:text-white"
                          : "hover:text-indigo-600"
                      }`
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            title="Global Search (Ctrl+K)"
            aria-label="Open global search"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700/60 font-mono">
              Ctrl K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          <nav aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
              {navLinks.map((link) => {
                const active = isActive(link.path);

                return (
                  <button
                    key={link.path}
                    onClick={() => goTo(link.path)}
                    aria-current={active ? "page" : undefined}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => goTo("/dashboard")}
              className="text-xs text-indigo-400 font-medium hover:underline flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              My Learning Dashboard
            </button>

            {(user.role === "admin" || user.role === "author") && (
              <button
                onClick={() => goTo("/admin")}
                className="mt-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-md font-medium"
              >
                Admin CMS
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// import React, { useState } from "react";
// import { useDevBase, ActiveView } from "../context/DevBaseContext";
// import {
//   Search,
//   Sun,
//   Moon,
//   Shield,
//   User,
//   Sparkles,
//   Menu,
//   X,
//   BookOpen,
//   Code,
//   Terminal,
//   Layers,
// } from "lucide-react";
// import { UserRole } from "../types";

// export const Navbar: React.FC = () => {
//   const {
//     activeView,
//     navigateTo,
//     theme,
//     toggleTheme,
//     user,
//     switchRole,
//     setSearchOpen,
//   } = useDevBase();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

//   const navLinks: { label: string; view: ActiveView }[] = [
//     { label: "Explore", view: "home" },
//     { label: "HTML & CSS", view: "html" },
//     { label: "Languages", view: "languages" },
//     { label: "Code Snippets", view: "snippets" },
//     { label: "Learning Paths", view: "paths" },
//     { label: "Articles", view: "articles" },
//     { label: "Playground", view: "playground" },
//   ];

//   const roles: UserRole[] = [
//     "guest",
//     "developer",
//     "contributor",
//     "author",
//     "admin",
//   ];

//   return (
//     <>
//       <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
//           {/* Zone 1: Single element wordmark */}
//           <div className="flex items-center gap-3 shrink-0">
//             <button
//               onClick={() => navigateTo("home")}
//               className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
//             >
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-base shadow-sm shadow-indigo-500/20">
//                 &lt;/&gt;
//               </div>
//               <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors whitespace-nowrap">
//                 DevBase
//               </span>
//             </button>
//           </div>

//           {/* Zone 2: Concise single-line text navigation links */}
//           <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
//             {navLinks.map((link) => {
//               const isActive = activeView === link.view;
//               return (
//                 <button
//                   key={link.view}
//                   onClick={() => navigateTo(link.view)}
//                   className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
//                     isActive
//                       ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-500 after:rounded-full"
//                       : `text-slate-300 ${theme === "dark" ? "hover:text-white" : "hover:text-indigo-600"}`
//                   }`}
//                 >
//                   {link.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Zone 3: Actions (Search, Theme, Role Switcher, Account / Admin) */}
//           <div className="flex items-center gap-3 shrink-0">
//             {/* Quick Search Trigger */}
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
//               title="Global Search (Ctrl+K)"
//             >
//               <Search className="w-3.5 h-3.5 text-slate-400" />
//               <span className="hidden sm:inline">Search docs...</span>
//               <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700/60 font-mono">
//                 &#8984;K
//               </kbd>
//             </button>

//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
//               title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
//               aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//               aria-pressed={theme === "dark"}
//             >
//               {theme === "dark" ? (
//                 <Sun className="w-4 h-4 text-amber-400" />
//               ) : (
//                 <Moon className="w-4 h-4 text-indigo-400" />
//               )}
//             </button>

//             {/* Role Switcher Dropdown */}
//             {/* <div className="relative">
//               <button
//                 onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
//                 className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
//                 title="Switch active user role for permission testing"
//               >
//                 <Shield className="w-3.5 h-3.5 text-indigo-400" />
//                 <span className="capitalize hidden md:inline">{user.role}</span>
//                 <span className="text-[10px] text-slate-500">&darr;</span>
//               </button>

//               {roleDropdownOpen && (
//                 <div
//                   className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
//                   onClick={() => setRoleDropdownOpen(false)}
//                 >
//                   <div className="px-3 py-1.5 border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
//                     Test Permissions Role
//                   </div>
//                   {roles.map((r) => (
//                     <button
//                       key={r}
//                       onClick={() => switchRole(r)}
//                       className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between capitalize transition-colors ${
//                         user.role === r ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-slate-300 hover:bg-slate-800/70'
//                       }`}
//                     >
//                       <span>{r}</span>
//                       {user.role === r && <span className="text-[10px] text-indigo-400">&bull; Active</span>}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div> */}

//             {/* User Dashboard / Account button */}
//             {/* <button
//               onClick={() => navigateTo('dashboard')}
//               className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border transition-colors ${
//                 activeView === 'dashboard'
//                   ? 'border-indigo-500 bg-indigo-500/10 text-white'
//                   : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
//               }`}
//               title="Developer Dashboard"
//             >
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 referrerPolicy="no-referrer"
//                 className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
//               />
//               <span className="text-xs font-medium hidden sm:inline">{user.name.split(' ')[0]}</span>
//             </button> */}

//             {/* Admin Panel button (visible when role is admin or author) */}
//             {/* {(user.role === 'admin' || user.role === 'superadmin' || user.role === 'author') && (
//               <button
//                 onClick={() => navigateTo('admin')}
//                 className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
//                   activeView === 'admin'
//                     ? 'bg-indigo-600 text-white shadow-sm'
//                     : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white'
//                 }`}
//               >
//                 <Layers className="w-3.5 h-3.5" />
//                 <span>Admin CMS</span>
//               </button>
//             )} */}

//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
//               aria-label="Toggle mobile menu"
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu dropdown */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
//             <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
//               {navLinks.map((link) => (
//                 <button
//                   key={link.view}
//                   onClick={() => {
//                     navigateTo(link.view);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
//                     activeView === link.view
//                       ? "bg-indigo-600 text-white"
//                       : "text-slate-300 hover:bg-slate-900"
//                   }`}
//                 >
//                   {link.label}
//                 </button>
//               ))}
//             </div>

//             <div className="pt-2 flex items-center justify-between">
//               <button
//                 onClick={() => {
//                   navigateTo("dashboard");
//                   setMobileMenuOpen(false);
//                 }}
//                 className="text-xs text-indigo-400 font-medium hover:underline flex items-center gap-1.5"
//               >
//                 <User className="w-3.5 h-3.5" />
//                 My Learning Dashboard
//               </button>
//               {(user.role === "admin" || user.role === "author") && (
//                 <button
//                   onClick={() => {
//                     navigateTo("admin");
//                     setMobileMenuOpen(false);
//                   }}
//                   className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md font-medium"
//                 >
//                   Admin CMS
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </header>
//     </>
//   );
// };
