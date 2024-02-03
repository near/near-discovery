import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import styled from 'styled-components';

import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperWapper = styled.div`
    margin: 0 auto;
    --swiper-pagination-bullet-width: 160px;
    --swiper-pagination-bullet-height: 10px;
    --swiper-pagination-bullet-border-radius: 20px;
    --swiper-pagination-bullet-inactive-color: rgba(33, 35, 42, 0.9);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-color: rgba(60, 65, 86, 1);
    --swiper-navigation-sides-offset: 0px;
    --swiper-theme-color: #fff;
`

const InnerSlider = styled.div`
    &.pb {
        padding-bottom: 80px;
    }
    &.plr {
        padding-left: 50px;
        padding-right: 50px;
    }
   
`

export default function Swipper({ 
    children, 
    pagination = true,
    navigation = false,
} : { 
    children: any;
    pagination?: boolean;
    navigation?: boolean;
}) {
    
    useEffect(() => {

    }, [children.length])

    const modules = []
    const classNames: string[] = []
    if (pagination) {
        modules.push(Pagination)
        classNames.push('pb')
    }

    if (navigation) {
        modules.push(Navigation)
        classNames.push('plr')
    }

    const paginationConfig = pagination ? {
        clickable: false,
    } : false


    return <SwiperWapper>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={paginationConfig}
            navigation={navigation}
            modules={modules}
            className="mySwiper">
            {
                children?.map((child: any, index: number) => {
                    return <SwiperSlide key={index}>
                        <InnerSlider className={classNames.join(' ')}>
                            {child}
                        </InnerSlider>
                    </SwiperSlide>
                })
            }
        </Swiper>
    </SwiperWapper>
}