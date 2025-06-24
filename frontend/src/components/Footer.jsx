import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/stories" className="text-gray-300 hover:text-white transition-colors">Flipkart Stories</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/wholesale" className="text-gray-300 hover:text-white transition-colors">Flipkart Wholesale</Link></li>
              <li><Link to="/corporate" className="text-gray-300 hover:text-white transition-colors">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">HELP</h3>
            <ul className="space-y-2">
              <li><Link to="/payments" className="text-gray-300 hover:text-white transition-colors">Payments</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/cancellation" className="text-gray-300 hover:text-white transition-colors">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/report" className="text-gray-300 hover:text-white transition-colors">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li><Link to="/cancellation-policy" className="text-gray-300 hover:text-white transition-colors">Cancellation & Returns</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms Of Use</Link></li>
              <li><Link to="/security" className="text-gray-300 hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link to="/grievance" className="text-gray-300 hover:text-white transition-colors">Grievance Redressal</Link></li>
              <li><Link to="/epr" className="text-gray-300 hover:text-white transition-colors">EPR Compliance</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">SOCIAL</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a></li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Mail Us:</h3>
            <address className="text-gray-300 text-sm not-italic">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </address>
          </div>
        </div>
      </div>

      {/* Payment & Security */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Become a Seller */}
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-400 p-2 rounded">
                <svg className="h-6 w-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Become a Seller</h4>
                <p className="text-gray-300 text-sm">Sell your products on Flipkart</p>
              </div>
            </div>

            {/* Advertise */}
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-400 p-2 rounded">
                <svg className="h-6 w-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Advertise</h4>
                <p className="text-gray-300 text-sm">Advertise your products</p>
              </div>
            </div>

            {/* Gift Cards */}
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-400 p-2 rounded">
                <svg className="h-6 w-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Gift Cards</h4>
                <p className="text-gray-300 text-sm">Buy gift cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Payment Methods:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">VISA</div>
                <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">MC</div>
                <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">AMEX</div>
                <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">UPI</div>
                <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">PayTM</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Secure:</span>
              <div className="bg-white p-1 rounded text-xs font-bold text-gray-900">SSL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2007-2024 Flipkart.com</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Sell On Flipkart</span>
              <span>•</span>
              <span>Advertise</span>
              <span>•</span>
              <span>Gift Cards</span>
              <span>•</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
