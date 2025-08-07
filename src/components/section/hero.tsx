'use client'
import Image from "next/image";
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";

export default function Hero() {
    const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  return (
    <section className="relative h-screen sm:h-[600px] w-[98%] min-h-96 flex justify-center items-center mb-[54px] ">
          {
              isLoading ? (
                <div className="flex animate-pulse space-x-3 w-full">
                  <div className="h-96 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isError && !isFetching  ? (
                <>  <Refetch refetch={refetch} /></>
            ) : (
              <>
                 
                  {data?.value?.videoUrl?.match(/\.(mp4|webm|ogg)$/i) && data?.value?.videoUrl  ? (
                     <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                  >
                      <source src={ data?.value?.videoUrl} type="video/mp4" />
                  </video>
                  ) : (
                    <Image
                      src={data?.value?.videoUrl || '/images/unavailable-image.png'}
                      alt="Hero Background"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  )}
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                  <div className="max-w-4xl relative z-10 px-6 md:px-0 text-white text-center py-16 lg:py-32">
                     <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{data?.value?.title || "[Judul hero belum diatur]"}</h1>
                      <p className="text-lg md:text-xl mb-6 text-center">{data?.value?.description || "[Deskripsi hero belum diatur]"}</p>
                  </div>
              </>
            )
          }
    </section>
    
  
  );
}
