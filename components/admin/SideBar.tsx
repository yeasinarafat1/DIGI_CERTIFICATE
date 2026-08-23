'use client'

import { Award, ExternalLink, LogOut, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

// Array of navigation links to map through
const NAV_LINKS = [
  {
    href: '/admin/dashboard',
    label: 'Registry Records',
    icon: Award,
  },
  {
    href: '/admin/mentor',
    label: 'Mentors',
    icon: Users,
  },
]

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a2942] text-slate-300 flex flex-col justify-between hidden md:flex shrink-0 z-10">
      <div>
        <div className="p-6 flex items-center gap-3 text-white border-b border-slate-700/50">
          <div className="bg-[#2d4059] p-2 rounded-lg">
            <Award className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-widest">
              APEX REGISTRY
            </h1>
            <p className="text-[10px] text-slate-400">Admin Control Panel</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {/* Map through the links and apply active styles dynamically */}
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            // Check if the current pathname matches the link's href
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? 'font-medium bg-[#244f54] text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors mt-4 border-t border-slate-700/50 pt-4">
            <ExternalLink className="w-4 h-4" />
            View Public Site
          </button>
        </nav>
      </div>

      <div className="p-4 bg-[#131e32]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#1e344d] flex items-center justify-center font-bold text-white text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Ataher Jamil</p>
            <p className="text-xs text-slate-400">ataherjamil1@gmail.com</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 rounded hover:bg-rose-500/20 transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default SideBar