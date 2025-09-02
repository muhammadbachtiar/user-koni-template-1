"use client"

import { useState } from "react"
import type { MenuWithContent } from "@/types/menu"
import { MenuItem } from "./menu-item"
import { MobileSidebar } from "./mobile-sidebar"
import { BiDotsHorizontalRounded } from "react-icons/bi"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MainNavProps {
  menuData: MenuWithContent
}

export function MainNav({ menuData }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)


  return (
    <nav className={classNames("relative z-10 transition-all duration-300")}>

      <MobileSidebar menuData={menuData} setIsOpen={setIsOpen} isOpen={isOpen} />

      <div className="hidden lg:block">
        <ul className="flex items-center space-x-1">
          {sortedMenuItems.slice(0,4).map((item) => (
            <li key={`${item.title}-${item.order}`}>
              <MenuItem item={item} />
            </li>
          ))}
          {sortedMenuItems.length > 4 && (
            <li className="relative">
              <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-2 bg-white text-black hover:text-gray-200 rounded-md transition-colors flex items-center space-x-1 text-sm font-medium"
                aria-label="More menu items"
              >
                <BiDotsHorizontalRounded size={18}/>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
