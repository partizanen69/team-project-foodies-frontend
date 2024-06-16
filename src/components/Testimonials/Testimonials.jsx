import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Container from 'components/Container/Container';

import { findTestimonials } from 'api/testimonials';
// import { getUserDetailsById } from 'api/users';

import styles from './Testimonials.module.scss';
import { Icon } from '../Icons/Icons';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import AuthorTestimonialsInfo from './getAuthor.jsx';

export const Testimonials = () => {
  // const dispatch = useDispatch();
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

//   const [users, setUsers] = useState([]);

//  useEffect(() => {
//   getUserDetailsById()
//       .then(users => {
//         setUsers(users);
//         setIsLoading(false);
//       })
//       .catch(error => console.log(error));
//  }, []);

  return (
    <Container>
      <div className={styles.testimonial_container}>
        {/* <div className={styles.testimonials_title_wrapper}> */}

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
              {testimonials.map((el) => (
                <SwiperSlide className={styles.swiperSlide} key={`${el._id}-${el.index}`}>
                  <Icon
                    id={'icon-quote'}
                    className={styles.icon}
                    width={24}
                    height={24}
                  />

                  <p className={styles.description}>{el.testimonial}</p>
                  {/* <h4 className={styles.owner}><AuthorTestimonialsInfo author={el.owner._id}/></h4> */}
                  <h4 className={styles.owner}>FOODIES USER</h4>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      {/* </div> */}

    </Container>
  );
};

// { _id, testimonial, owner }, index

