import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              AnalyticalInvestments
            </h3>
            <p className="text-muted-foreground">
              Empowering investors with data-driven insights and strategic solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/investment-analysis" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Investment Analysis
                </Link>
              </li>
              <li>
                <Link to="/services/portfolio-management" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Portfolio Management
                </Link>
              </li>
              <li>
                <Link to="/services/risk-assessment" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/services/market-research" className="text-muted-foreground hover:text-purple-500 transition-colors">
                  Market Research
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: info@analyticalinvestments.com
              </li>
              <li className="text-muted-foreground">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                Address: 123 Financial District, New York, NY 10004
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-purple-500/10">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} AnalyticalInvestments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 