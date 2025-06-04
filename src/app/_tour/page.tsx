'use client'
import { useState } from "react";
import { BiGlobe, BiPlus } from "react-icons/bi";
import useTour from "@/hooks/contents/tour/useList";
import Link from "next/link";
import { CiMap } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/settings/useSettings";


export default function Home() {
const [search, setSearch] = useState('');

const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting("tour", {});
const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch, isError } = useTour({"search": search, 'page_size': 6});
const allTour = data?.pages?.flatMap(page => page?.data) || [];

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
      <>
         {
            isSettingLoading ? (
                <div className="flex animate-pulse mb-4 col-span-8 w-full">
                    <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isSettingError && !isSettingFetching  ? (
                <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetchSetting} />
                </div>
            ) : (
                <>
                    <section style={backgroundStyle} className={`relative rounded-md p-4 lg:p-14 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
                        <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                        <div className="relative z-10 px-0 sm:px-8  text-start">
                            <h2 className="mb-4 text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting?.value?.title || "[Judul wisata belum diatur]"}</h2>
                        </div>
                    </section>
                </>
            )
        }
        <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6">
            <div className="bg-transparent rounded-s-md col-span-4 lg:py-6 grid grid-cols-6">    
                <div className="col-span-6 grid grid-cols-6 gap-8">
                    <div className="col-span-6 grid grid-cols-6 gap-1 px-3 md:px-0 justify-between">
                        <div className="col-span-6 text-end">
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown"value={search} onChange={(e) => setSearch(e.target.value)} className="block py-3 px-5 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari judul ..." />
                                <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center ">
                        {isLoading || (allTour[0] === undefined && isFetching)  ? (
                            <div className="col-span-6 grid grid-cols-12 w-full h-full justify-center gap-3">
                               {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col justify-center dark:bg-gray-800 animate-pulse">
                                      <div className="relative rounded-4xl overflow-hidden min-h-[68vh] flex justify-center items-end bg-gray-300"></div>
                                    </div>
                                  ))                                  
                               }
                            </div>
                        ) : !isError && !isFetching && allTour[0] === undefined ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Wisata tidak tersedia</p>
                                </div>
                            </div>
                        ) : isError && !isFetching  ? (
                            <div className="w-full col-span-6 h-full flex justify-center">
                                <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400 text-center">Terjadi kesalahan, silakan ulangi</p>
                                   <Refetch refetch={refetch}/>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col-span-6 grid grid-cols-12 px-3 md:px-0 gap-6 sm:w-full">
                                    {allTour.map((card) => 
                                        <div tabIndex={1} key={card.id} className="col-span-12 rounded-4xl md:col-span-6 xl:col-span-4 flex flex-col justify-center dark:bg-gray-800 group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out">    
                                            <div className="relative rounded-4xl overflow-hidden min-h-[68vh] flex justify-center items-end">
                                                <Image
                                                    className="rounded-4xl absolute top-0 left-0 w-full min-w-full min-h-full h-full object-cover group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out"
                                                    src={card?.thumbnail || '/images/unavailable-image.png'}
                                                    alt="Tour Thumbnail"
                                                    width={500}
                                                    height={300}
                                                    style={{
                                                        width: "auto",
                                                        height: "68vh",
                                                    }}
                                                />
                                                <div className="absolute bottom-0 left-0 w-full h-1/3 "></div>
                                                <div className="relative bg-gradient-to-t from-black/70 via-black/55 to-black/0 rounded-b-4xl w-full p-6">
                                                    <Link href={`/tour/${card?.slug ?? ""}`} className="flex flex-col gap-2">
                                                        <h5 className="text-3xl md:text-4xl font-bold mb-5 tracking-tighter text-white dark:text-white hover:text-blue-600">{card.title}</h5>
                                                    </Link>
                                                    <div className="flex items-center mt-2">
                                                        <p className="my-0 text-mb sm:text-lg font-semibold text-white dark:text-white">{card?.address ?? "[Alamat tidak tersedia]"}</p>
                                                    </div>
                                                    <div className="col-span-2 lg:col-span-1 text-start">
                                                        <div className="flex justify-start items-center gap-x-2">
                                                            <CiMap className="w-4 h-4 rounded-sm text-white"></CiMap>
                                                            <a href={card?.link?.gmap || ''} target="blank" className="text-md font-normal mb-0 text-white dark:text-white hover:font-bold ">Lokasi</a>
                                                        </div>
                                                        <div className="flex justify-start items-center gap-x-2">
                                                            <BiGlobe className="w-4 h-4 rounded-sm text-white"></BiGlobe>
                                                            <a href={card?.link?.website || ''} target="blank" className="text-md font-normal mb-0 text-white dark:text-white">{card?.link?.website ?? ''}</a>
                                                        </div>
                                                        <div className="flex justify-start items-center gap-x-2">
                                                            <CgMail className="w-4 h-4 rounded-sm text-white"></CgMail>
                                                            <a href={card?.link?.email || ''} target="blank" className="text-md font-normal mb-0 text-white dark:text-white">{card?.link?.email ?? ''}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    )}     
                                </div>
                                <div className="col-span-6">
                                    <button 
                                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" 
                                        onClick={() => fetchNextPage()} 
                                        disabled={!hasNextPage || isFetching}
                                    >
                                        Tampilkan lebih banyak
                                        <BiPlus />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}
