"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MenuWithContent } from "@/types/menu"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { FaX } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MobileSidebarProps {
  menuData: MenuWithContent
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function MobileSidebar({ menuData, isOpen, setIsOpen }: MobileSidebarProps) {

  const pathname = usePathname()

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.getElementById("mobile-sidebar")
      if (isOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isOpen, setIsOpen])

  return (
    <div className="block z-30">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 block lg:hidden  text-black hover:bg-gray-100 rounded-md"
        aria-label="Open menu"
      >
        <GiHamburgerMenu className="h-6 w-6" />
      </button>

      <div
        className={classNames(
          "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-sidebar"
        className={classNames(
          "fixed top-0 right-0 z-50 h-screen w-80 max-w-[80vw] bg-white shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-black hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
          >
            <FaX className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <ul className="list-none flex flex-col p-4 font-medium">
            {sortedMenuItems.map((menu) => (
              <li key={menu.order} className="mb-2">
                {!menu.child || menu.child.length === 0 ? (
                  <Link
                    href={menu.route || "/"}
                    className={classNames(
                      "block py-2 px-3 w-full font-semibold rounded-md transition-all duration-200",
                      pathname === menu.route ? "bg-gray-100 text-black" : "text-black hover:bg-gray-50",
                    )}
                  >
                    {menu.title}
                  </Link>
                ) : (
                  <Disclosure as="div" className="w-full">
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          className={classNames(
                            "flex justify-between text-start items-center w-full py-2 px-3 font-semibold rounded-md transition-all duration-200",
                            pathname.startsWith(menu.route || "")
                              ? "bg-gray-100 text-black"
                              : "text-black hover:bg-gray-50",
                          )}
                        >
                          <span>{menu.title}</span>
                          <svg
                            className={classNames(
                              "min-w-2 min-h-2 w-2 h-2 transition-transform duration-300",
                              open ? "rotate-180" : "rotate-0",
                            )}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </DisclosureButton>

                        <DisclosurePanel className="transition-all duration-300 overflow-hidden">
                          <ul className="list-none py-2 pl-4 pr-2 space-y-1">
                            {menu.child?.map((submenu, index) => {
                              const fullPath = `${menu.route || ""}${submenu.route || ""}`
                              return (
                                <li
                                  key={submenu.order}
                                  className="transform transition-all duration-300 ease-in-out"
                                  style={{
                                    transitionDelay: `${index * 50}ms`,
                                  }}
                                >
                                    {!submenu.child || submenu.child.length === 0 ? ( 
                                        <Link
                                            href={fullPath}
                                            className={classNames(
                                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                                            pathname === fullPath
                                                ? "bg-gray-100 text-black"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-black",
                                            )}
                                        >
                                            {submenu.title}
                                        </Link>
                                    ) : 
                                        <NestedSubmenu submenu={submenu} parentPath={fullPath} level={1} />
                                    }
                                </li>
                              )
                            })}
                          </ul>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface NestedSubmenuProps {
  submenu: MenuWithContent[0]
  parentPath: string
  level: number
}

function NestedSubmenu({ submenu, parentPath, level }: NestedSubmenuProps) {
  const pathname = usePathname()

  if (!submenu.child || submenu.child.length === 0) return null

  return (
    <Disclosure as="div" className="mt-1">
      {({ open }) => (
        <>
            {submenu.staticPage !== null ? (
                <Link href={parentPath}>
                    <DisclosureButton
                        className={classNames(
                        "flex justify-between text-start items-center w-full py-1.5 px-3 text-sm font-medium rounded-md transition-all duration-200",
                        "ml-2", 
                        pathname.startsWith(parentPath)
                            ? "bg-gray-100 text-black"
                            : "text-gray-700 hover:bg-gray-50 hover:text-black",
                        )}
                    >
                        <span>{submenu.title}</span>
                        <svg
                        className={classNames("min-w-2 min-h-2 w-2 h-2 transition-transform duration-300", open ? "rotate-180" : "rotate-0")}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                        </svg>
                    </DisclosureButton>
                </Link>
            ) : (
                <DisclosureButton
                    className={classNames(
                    "flex justify-between text-start items-center w-full py-1.5 px-3 text-sm font-medium rounded-md transition-all duration-200",
                    "ml-2", 
                    pathname.startsWith(parentPath)
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50 hover:text-black",
                    )}
                >
                    <span>{submenu.title}</span>
                    <svg
                    className={classNames("min-w-2 min-h-2 w-2 h-2 transition-transform duration-300", open ? "rotate-180" : "rotate-0")}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                    </svg>
                </DisclosureButton>
            )}
          <DisclosurePanel className="transition-all duration-300 overflow-hidden">
            <ul className="list-none py-1 pl-4 pr-1 space-y-1">
                {submenu.child?.map((childItem, index) => {
                    const fullChildPath = `${parentPath}${childItem.route || ""}`
                    return (
                    <li
                        key={childItem.order}
                        className="transform transition-all duration-300 ease-in-out"
                        style={{
                        transitionDelay: `${index * 50}ms`,
                        }}
                    >
                        {childItem.staticPage !== null && !childItem.child && (
                        <Link
                            href={fullChildPath}
                            className={classNames(
                            "block rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                            pathname === fullChildPath
                                ? "bg-gray-100 text-black"
                                : "text-gray-700 hover:bg-gray-50 hover:text-black",
                            )}
                        >
                            {childItem.title}
                        </Link>
                        )}
                        {childItem.child && childItem.child.length > 0 && (
                        <NestedSubmenu submenu={childItem} parentPath={fullChildPath} level={level + 1} />
                        )}
                  </li>
                )
                })}
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
