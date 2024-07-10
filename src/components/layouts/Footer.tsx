// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <>
    <footer className="bg-black text-white py-6">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contact Information */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="py-1">780 Real Estate Street,</p>
                <p className="py-1">Trivandrum, Kerala, 56778</p>
                <p className="py-1">Phone: +123 456 7890</p>
                <p className="py-1">Email: dreamBuy@example.com</p>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                <ul className="list-none">
                    <li><a href="#" className="text-white hover:text-gray-400 pt-3">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-400 pt-3">Properties</a></li>
                    <li><a href="#" className="text-white hover:text-gray-400 pt-3">About Us</a></li>
                    <li><a href="#" className="text-white hover:text-gray-400 pt-3">Contact Us</a></li>
                </ul>
            </div>

            {/* Social Media Links */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-3 pt-3">
                    <a href="#" className="text-white hover:text-gray-400">
                      <FontAwesomeIcon icon={faFacebook} size='xl'/>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                      <FontAwesomeIcon icon={faLinkedin} size='xl'/>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                      <FontAwesomeIcon icon={faTwitter} size='xl'/>
                    </a>
                    <a href="#" className="text-white hover:text-gray-400">
                        <FontAwesomeIcon icon={faInstagram} size='xl'/>
                    </a>
                </div>
            </div>

            {/* Additional Links or Information */}
            <div>
                <h3 className="text-lg font-semibold mb-2">About Us</h3>
                <p>Welcome to Dream Buy, your premier destination for finding the perfect property. At Dream Buy, we are dedicated to simplifying your real estate journey with innovative technology and personalized service.</p>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()} Dream Buy. All rights reserved.</p>
            <p>Designed by <a href="#" className="text-blue-500 hover:text-blue-700">Dream Buy</a></p>
        </div>
    </div>
</footer>

    </>
  );
};

export default Footer;
