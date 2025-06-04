"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";
import { CSSProperties, useState } from "react"
import React from "react";
import LightboxImage from "./Lightbox";
import useInfografis from "@/hooks/contents/infografis/useInfografis";
import Refetch from "./refetch";
import { Infografis } from "@/services/controlers/infografis/type";

interface SliderCardProps {
    useButton?: boolean;
    useDots?: boolean; 
    slideToShow: number
  }

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

const SliderCard = ({useButton = false, useDots= false, slideToShow = 4}: SliderCardProps) => {
  const { data, isLoading, isFetching, refetch, isError } = useInfografis();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
function SampleNextArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}
      
function SamplePrevArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
      );
}  
    
let settings, height : string;
  
settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  nextArrow: !useButton ? <SampleNextArrow /> : undefined,
  prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
  ...(useDots && {
      appendDots: (dots: React.ReactNode) => (
        <div
          style={{
            position: 'unset',
            padding: "0 10px"
          }}
        >
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
      )
    }
  )
};
height = "50vh"

if(slideToShow > 1){
  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 664,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots: React.ReactNode) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
  }
  height = "68vh"
}

SamplePrevArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};

SampleNextArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};
  
return (
        <div className="w-full">
            <Slider {...settings}>
              {
                isLoading || isFetching && (!data || data.length === 0) ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative px-3 animate-pulse">
                      <div className="min-h-96 w-80 flex-1 rounded-2xl bg-gray-200"></div>
                    </div>
                ))
                ) : !isError && !isFetching && (!data || data.length === 0) ? (
                    <div className="mb-4 col-span-8 w-full">
                      <p className="text-black text-md min-h-52 flex items-center justify-center dark:text-gray-400">Infografis tidak tersedia</p>
                    </div>
                ) : isError && !isFetching  ? (
                    <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                      <Refetch  refetch={refetch} />
                    </div>
                ) : (
                  data.map((card: Infografis, index:number) => {
                      return (
                        <div key={card.slug} tabIndex={1}  onClick={()=> {setIsOpen(true); setCurrentIndex(index)}}>
                          <div className="relative lg:px-2 group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out"> 
                              <div className="relative flex justify-center overflow-hidden w-full h-full group rounded-2xl">
                                <Image
                                    className="h-full w-full min-w-full md:min-h-96 object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out"
                                    src={card.link?.startsWith("https:/") ?  card.link : '/images/not-fuound-image.jpg'}
                                    alt="Tour Banner"
                                    width={500}
                                    height={300}
                                    style={{
                                      width: "auto",
                                      height: height,
                                    }}
                                  />
                              </div>
                              <div className="flex flex-col gap-2 px-2 mt-2 w-full h-full text-start items-end"> 
                                <h5 className="text-lg text-start font-bold w-full mx-2 tracking-tighter text-gray-700 dark:text-white">{card.title}</h5>
                                <p className="text-sm text-start font-semibold w-full mx-2 tracking-tighter text-gray-600 dark:text-white line-clamp-3">{card.description}</p>
                              </div>
                          </div>
                        </div>
                      )
                    }
                  )
                )
               }
          </Slider>
          <LightboxImage data={data} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
        </div>
      )
}

export default SliderCard;