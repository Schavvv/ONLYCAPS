import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="contact-socials-section dissolve-section">
                <div className="inner w-full max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        {/* Contact - Using inline styles to force white color */}
                        <div className="flex-1">
                            <h3 className="contact-title" style={{ color: 'white' }}>CONTACT</h3>
                            <div className="contact-info" style={{ color: 'white' }}>📞 (+63) 945-815-9359</div>
                            <div className="contact-info" style={{ color: 'white' }}>✉️ onlycapsco@gmail.com</div>
                            <div className="contact-info" style={{ color: 'white' }}>📍 504 J. P. Rizal St, Marikina, 1800 Metro Manila</div>
                            <div className="contact-info" style={{ color: 'white' }}>🕒 Mon-Fri: 9AM - 6PM EST</div>
                        </div>

                        <div className="hidden md:block w-px h-32 bg-white/30 mx-12" />

                        {/* Socials - Only Facebook and Instagram */}
                        <div className="flex-1">
                            <h3 className="contact-title" style={{ color: 'white' }}>SOCIALS</h3>
                            <div className="social-icons flex gap-4">
                                {/* Facebook */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'white' }}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'white' }}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.256 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.153-1.772A4.903 4.903 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.08 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                    </svg>
                                </a>
                            </div>
                            <div className="mt-6">
                                <p className="text-white text-sm" style={{ color: 'white' }}>Follow us for latest drops</p>
                                <p className="text-white text-sm mt-1" style={{ color: 'white' }}>@onlycaps_official</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center border-t border-gray-700 pt-6">
                        <p className="text-white text-sm" style={{ color: 'white' }}>© 2026 ONLYCaps.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;