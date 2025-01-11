import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CAlert,
    CSpinner
} from '@coreui/react';
import '../Super.scss';  // Assuming you have Super.scss for styling
import 'react-toastify/dist/ReactToastify.css'; // If you want to use toasts
import { fetchGuestById } from '../../api/actions/guestActions';  // Use fetchGuestById

const ViewGuest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { guestDetails, loading, error, message } = useSelector((state) => ({
      guestDetails: state.guest.guestDetails,
      loading: state.guest.loading,
      error: state.guest.error,
      message: state.guest.message
    }));

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchGuest = async () => {
            try {
                const response = await dispatch(fetchGuestById(id)).unwrap(); // Changed to fetchGuestById
                if (!response) {
                   throw new Error('Guest details not found');
                }
            } catch (err) {
                 setErrorMessage(err.message || 'Failed to fetch guest details');
                navigate('/guests')
            }
        };
        fetchGuest();
    }, [dispatch, id]);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Guest Details</strong>
                    </CCardHeader>
                    <CCardBody>
                        {loading && (
                            <div className="text-center">
                                <CSpinner color="primary" />
                                <p>Loading guest details...</p>
                            </div>
                        )}
                        {error && (
                          <CAlert color="danger" className="mb-4">
                            {error.message || 'Failed to fetch guest details'}
                         </CAlert>
                        )}
                        {errorMessage && (
                        <CAlert color="danger" className="mb-4">
                          {errorMessage}
                        </CAlert>
                        )}
                        {!loading && !error && guestDetails && (
                            <div>
                                <p>
                                    <strong>Name:</strong> {guestDetails?.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {guestDetails?.email}
                                </p>
                                 <p>
                                    <strong>Phone:</strong> {guestDetails?.phoneNumber}
                                </p>
                                <p>
                                    <strong>Arrival Date:</strong>{" "}
                                    {new Date(guestDetails?.arrivalDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Departure Date:</strong>{" "}
                                    {new Date(guestDetails?.departureDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Reason:</strong> {guestDetails?.reason}
                                </p>
                                <p>
                                    <strong>QR Code:</strong> {guestDetails?.qrCode}
                                </p>
                                <p>
                                    <strong>Access Code:</strong> {guestDetails?.accessCode}
                                </p>
                                  <p>
                                    <strong>Notes:</strong> {guestDetails?.notes}
                                </p>
                                <p>
                                    <strong>Status:</strong> {guestDetails?.status}
                                </p>
                            </div>
                        )}

                        {!loading && !error && !guestDetails && (
                            <p>Guest not found.</p>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default ViewGuest;