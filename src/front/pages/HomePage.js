import React from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
} from '@coreui/react';
import { FaArrowRight, FaRegListAlt, FaBullhorn, FaHandHoldingUsd } from 'react-icons/fa';
import Testimonials from './Testimonials';
import Imges1 from '../image/view-city-square.jpg';
import Imges3 from '../image/2.jpg';
import Imges4 from '../image/3.jpg';
import Imges5 from '../image/5.jpg';
import Imges6 from '../image/6.jpg';
import Imges7 from '../image/7.jpg';
import FAQ from '../image/register-now-banner.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import './home.scss';

const HomePage = () => {
  const images = [
    { src: Imges1, title: 'Welcome to Beta PMS', description: 'Discover an all-in-one solution for property management with BetaPMS.', link: '/about' },
    { src: Imges3, title: 'Property Management', description: 'Easily manage all your properties, track unit availability, and more.', link: '/companies' },
    { src: Imges4, title: 'Tenant Management', description: 'Keep tenant details organized, track payments, and manage leases effortlessly.', link: '/promotions' },
    { src: Imges5, title: 'Lease Agreements', description: 'Create and manage digital lease agreements, and send notifications for renewals.', link: '/promotions' },
    { src: Imges6, title: 'Maintenance Tracking', description: 'Track and manage maintenance requests, ensuring timely resolution of issues.', link: '/promotions' },
    { src: Imges7, title: 'Rent Collection', description: 'Generate invoices, track payments, and let tenants pay their rent online.', link: '/promotions' },
  ];

  const clients = ['/path/to/client-logo1.png', '/path/to/client-logo2.png', '/path/to/client-logo3.png', '/path/to/client-logo4.png'];

  return (
    <div>
      <Navbar />
      
      <CContainer fluid className="p-0">
        <CCarousel animate interval={3000} autoSlide>
          {images.map((image, index) => (
            <CCarouselItem key={index} className="text-center carousel-item">
              <motion.img src={image.src} alt={image.title} loading="lazy" className="d-block w-100"
                initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <CCarouselCaption className="d-none d-md-block carousel-caption">
                <motion.h3 className="text-white"
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >{image.title}</motion.h3>
                <motion.p className="text-light"
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                >{image.description}</motion.p>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                >
                  <CButton href={image.link} color="light" className="hover-animation">
                    Learn More <FaArrowRight className="ml-2" />
                  </CButton>
                </motion.div>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
        </CCarousel>
      </CContainer>

      {/* Other Sections with updated animations */}
      {/* ... Remainder of the component remains unchanged ... */}

      <Footer />
    </div>
  );
};

export default HomePage;
