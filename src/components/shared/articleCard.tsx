import Image from "next/image";
import Link from "next/link";
interface Props {
    thumbnail: string | null; 
    title: string;
    slug: string;
    category_name: string;
    published_at: string | null;
    description: string;
  }

export default function ArticleCard({thumbnail, title, slug, category_name, published_at, description}: Props) {
  return (
    <Link href={`/article/${slug}`} tabIndex={1} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
        <div className="group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out px-2">
            <div className="relative overflow-hidden rounded-sm w-full h-60 group">
              {thumbnail && 
                <Image 
                className="w-full h-full object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out" 
                src={thumbnail} 
                width={500}
                height={500}
                alt="Article Thumbnail"/>
              }  
            </div>
            <div className="p-1 pe-6">
                <div className='flex flex-row col-span-8 my-2 gap-1 justify-items-start items-start'>
                    <span className="self-center align-baseline text-base font-semibold uppercase text-[#929AAB]">{category_name}</span>
                    <div className="self-center w-px h-4 bg-gray-400"></div>
                    <span className="self-center align-baseline text-xs font-medium text-black">{published_at}</span>
                </div>
                <h5 className="my-2 leading-5 text-lg font-bold line-clamp-3  tracking-tight text-gray-900  dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-sm line-clamp-3 leading-5 text-gray-500 lg:text-gray-800 dark:text-gray-400">{description}</p>
            </div>
        </div>
    </Link>  
  );
}
