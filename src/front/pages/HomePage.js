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
import './home.css'

const HomePage = () => {
  const images = [
    {
      src: Imges1,
      title: 'Welcome to Beta PMS',
      description: 'Discover an all-in-one solution for property management with BetaPMS.',
      link: '/about',
    },
    {
      src: Imges3,
      title: 'Property Management',
      description: 'Easily manage all your properties, track unit availability, and more.',
      link: '/companies',
    },
    {
      src: Imges4,
      title: 'Tenant Management',
      description: 'Keep tenant details organized, track payments, and manage leases effortlessly.',
      link: '/promotions',
    },
    {
      src: Imges5,
      title: 'Lease Agreements',
      description: 'Create and manage digital lease agreements, and send notifications for renewals.',
      link: '/promotions',
    },
    {
      src: Imges6,
      title: 'Maintenance Tracking',
      description: 'Track and manage maintenance requests, ensuring timely resolution of issues.',
      link: '/promotions',
    },
    {
      src: Imges7,
      title: 'Rent Collection',
      description: 'Generate invoices, track payments, and let tenants pay their rent online.',
      link: '/promotions',
    },
  ];

  const clients = [
    '/path/to/client-logo1.png',
    '/path/to/client-logo2.png',
    '/path/to/client-logo3.png',
    '/path/to/client-logo4.png',
  ];

  return (
    <div>
      <Navbar />
      <CContainer fluid className="p-0">
        <CCarousel animate interval={3000} autoSlide={true}>
          {images.map((image, index) => (
            <CCarouselItem key={index} className="text-center">
              <img src={image.src} alt={image.title} className="d-block w-100" />
              <CCarouselCaption className="d-none d-md-block">
                <h3 className="text-white">{image.title}</h3>
                <p className="text-light">{image.description}</p>
                <CButton href={image.link} color="light" className="hover-animation">
                  Learn More <FaArrowRight className="ml-2" />
                </CButton>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
        </CCarousel>
      </CContainer>

      <CContainer className="mt-5">
        <CRow>
          <CCol>
            <h2>Welcome to BetaPMS</h2>
            <p>Your go-to solution for efficient and streamlined property management. We specialize in providing tools that simplify property rental, tenant communication, and maintenance tracking.</p>
          </CCol>
        </CRow>

        <CRow className="mt-5">
          <CCol>
            <h2>Our Clients</h2>
            <div className="clients-container d-flex overflow-auto" style={{ whiteSpace: 'nowrap' }}>
              {clients.map((client, index) => (
                <img key={index} src={client} alt={`Client ${index + 1}`} className="mx-3" style={{ width: '150px', height: 'auto' }} />
              ))}
            </div>
          </CCol>
        </CRow>

        <CRow className="mt-5">
          <CCol>
            <h2 className="mb-4">Our Services</h2>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={4}>
            <CCard className="shadow-lg hover-animation">
              <CCardBody>
                <FaRegListAlt className="text-primary mb-3" size="2em" />
                <CCardTitle>Tenant Management</CCardTitle>
                <CCardText>Manage tenant information, payments, and communications all in one place.</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="shadow-lg hover-animation">
              <CCardBody>
                <FaBullhorn className="text-primary mb-3" size="2em" />
                <CCardTitle>Property Listings</CCardTitle>
                <CCardText>Easily advertise available properties, manage inquiries, and showcase your listings with our intuitive platform.</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="shadow-lg hover-animation">
              <CCardBody>
                <FaHandHoldingUsd className="text-primary mb-3" size="2em" />
                <CCardTitle>Financial Management</CCardTitle>
                <CCardText>Track rent payments, expenses, and generate financial reports to keep your property finances organized.</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow
          className="mt-5 text-center text-white py-5"
          style={{
            backgroundImage: `url(${FAQ})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
          <CCol className="z-2 position-relative">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
              <h2 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Ready to Manage Your Property Efficiently?</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}>
              <CButton color="success" size="lg" href="/register" className="mt-3" style={{ padding: '0.75rem 2rem', fontSize: '1.25rem' }}>
                Get Started Now
              </CButton>
            </motion.div>
          </CCol>
        </CRow>

        {/* Testimonials Section */}
        <Testimonials />
      </CContainer>

      <Footer />
    </div>
  );
};

export default HomePage;