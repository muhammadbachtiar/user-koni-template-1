"use client"
import { SetStateAction, useState } from "react";
import Logo from "../shared/logo";
import Link from "next/link";
import { MainNav } from "../navigation/main-nav";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";


export default function Header() {

    const { data: menu, isLoading, refetch, isFetching, isError } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(e.target.value);
    };
    
  return (
    <nav className="bg-white border-b-2 px-4 border-gray-300 flex items-center justify-between dark:bg-gray-900 w-full z-20 top-0 start-0 py-2 gap-y-2">
        <div className="max-w-screen flex flex-wrap items-center justify-between w-full gap-y-2">
            <Logo/>
            {   
                isLoading ? (
                    <div className="flex animate-pulse space-x-3">
                        <div className="hidden md:flex flex-row gap-x-6">
                            <div className=" h-4 w-24 rounded bg-gray-200"></div>
                            <div className="h-4 w-24 rounded bg-gray-200"></div>
                            <div className="h-4 w-24 rounded bg-gray-200"></div>
                            <div className="h-4 w-24 rounded bg-gray-200"></div>
                        </div>
                        <div className="flex md:hidden flex-row gap-x-6">
                            <div className="h-10 w-10 rounded-2xl bg-gray-200"></div>
                        </div>
                    </div>
                ) : isError && !isFetching  ? (
                    <Refetch refetch={refetch} />
                ) : (
                    <MainNav menuData={(menu?.value?.length > 0) ? menu.value
                            :  [
                                {
                                    "order": 1,
                                    "title": "Home",
                                    "route": "/",
                                    "staticPage": null,
                                    "child": null
                                },
                                {
                                    "order": 2,
                                    "title": "Artikel",
                                    "route": "/article",
                                    "staticPage": null,
                                    "child": null
                                }
                            ]}  />
                )
            }
            <div className="items-center justify-between w-full flex lg:w-2xs md:order-3" id="navbar-sticky">
                <div className="relative w-full">
                    <input onChange={handleChange} id="search-dropdown" className="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-200 rounded-e-xl rounded-s-xl border-s-2 border border-gray-300 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Apa yang Anda cari?" required />
                    {searchValue ? (
                      <Link href={`/search/${searchValue}`}> 
                          <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-black cursor-pointer rounded-e-xl border border-s-0 border-gray-300 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </span>
                      </Link>
                      ) : (
                        <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-black cursor-pointer rounded-e-xl border border-s-0 border-gray-300 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </span>
                    )}
                </div>
            </div>
        </div>
    </nav>
  );
}
