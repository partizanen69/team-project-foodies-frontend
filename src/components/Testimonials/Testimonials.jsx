import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Container from 'components/Container/Container';

import { findTestimonials } from 'api/testimonials';

import styles from './Testimonials.module.scss';
import { Icon } from "../Icons/Icons";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonials = () => {
  // const dispatch = useDispatch();
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    findTestimonials()
      .then(testimonials => {
        setTestimonials(testimonials);
        setIsLoading(false);
      })
      .catch();
  }, []);


  return (
    <Container>
        <div className={styles.testimonial_container}>
          {/* <div className={styles.testimonials_title_wrapper}> */}

        {testimonials.length > 0 &&
        <>


        <h3 className={styles.testimonial_hightlight}>What our customer say</h3>
          <h2 className={styles.testimonial_title}>TESTIMONIALS</h2>


            <Swiper
            autoplay={{
              delay: 6000,
              disableOnInteraction: true,
          }}

         spaceBetween={30}
         slidesPerView={1}
          pagination={{
          el: `.${styles.paginationContainer}`,
          clickable: true,
          dynamicBullets: true,
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
            modules={[Pagination, Autoplay]}
            className={styles.swiper}
          >
            {testimonials.map((el) => (
              <SwiperSlide className={styles.swiperSlide} key={el._id}>
                <Icon
                  id={"icon-quote"}
                  className={styles.icon}
                  width={24}
                  height={24}
                />

                <p className={styles.description}>{el.testimonial}</p>
                <h4 className={styles.owner}>{el.owner}</h4>

              </SwiperSlide>
            ))}
          </Swiper>
        </>
}
</div>
          {/* </div> */}
</Container>
  );
};


