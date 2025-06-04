'use client'
import Link from "next/link";
import Image from "next/image";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Tour = () => {

    const { data, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  
  return (
       <>
        <section className="relative w-full flex justify-center items-center">
            <div className="col-span-4 w-full grid grid-cols-6 gap-10 justify-items-center">
                {
                    isSettingLoading ? (
                    <>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center dark:bg-gray-800 animate-pulse">
                            <div className="h-full w-full min-h-96 min-w-96 shadow-2xl backdrop-blur-2xl rounded-4xl bg-gray-300"></div>
                        </div>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12 animate-pulse">
                            <div className="h-10 w-3/4 bg-gray-300 rounded mb-5"></div>
                            <div className="h-6 w-1/2 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-11/12 bg-gray-300 rounded mt-2"></div>
                            <div className="h-4 w-10/12 bg-gray-300 rounded mt-2"></div>
                            <div className="inline-flex justify-center mt-8 border-2 lg:mt-12 items-center py-4 px-6 rounded-md bg-gray-300 w-40 h-10"></div>
                        </div>
                    </>
                    ) : isSettingError && !isSettingFetching  ? (
                        <div className="w-full col-span-6 xl:col-span-2 flex justify-center dark:bg-gray-800">          
                            <Refetch refetch={refetchSetting} />
                        </div>
                    ) : (
                      <>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center  dark:bg-gray-800">                  
                            <Image
                                className="h-full w-full md:min-h-96 shadow-2xl backdrop-blur-2xl rounded-4xl"
                                src={data?.value?.imageUrl ?? '/images/unavailable-image.png'}
                                alt="Tour Banner"
                                width={500}
                                height={300}
                                style={{
                                width: "auto",
                                height: "auto",
                                }}
                            />
                        </div>
                        <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12">                  
                            <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white">{data?.value?.title ?? "[Judul wisata belum diatur]"}</h5>
                            <div className="flex items-center mt-2">
                                <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{data?.value?.subTitle ?? "[Sub judul wisata belum diatur]"}</p>
                            </div>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">{data?.value?.description ?? "[Deskripsi wisata belum diatur]"}</p>
                            <Link href={'/tour'} className="inline-flex justify-center mt-8 border-2 lg:mt-12  hover:text-black hover:border-black items-center py-4 px-6 text-base font-medium text-center bg-[#393E46] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                                Lihat Selengkapnya
                            </Link>
                        </div>
                      </>
                    )
                }
            </div>
        </section>
       </>
  );
};

export default Tour;