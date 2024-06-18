import React, { useEffect, useState } from 'react';

import Container from 'components/Container/Container';

import { findTestimonials } from 'api/testimonials';

import styles from './Testimonials.module.scss';
import Icon from 'components/Icon/Icon';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    findTestimonials()
      .then(testimonials => {
        setTestimonials(testimonials);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <div className={styles.testimonial_container}>

        {testimonials.length > 0 && (
          <>
            <h3 className={styles.testimonial_hightlight}>
              What our customer say
            </h3>
            <h2 className={styles.testimonial_title}>TESTIMONIALS</h2>

            <Swiper
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              className={styles['swiper']}
            >
              {testimonials.map(el => (
                <SwiperSlide
                  className={styles.swiperSlide}
                  key={`${el._id}-${el.index}`}
                >
                  <Icon name={"icon-quote"} className={styles.icon}/>
                  <p className={styles.description}>{el.testimonial}</p>
                  <h4 className={styles.owner}>{el.owner.name}</h4>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </Container>
  );
};
