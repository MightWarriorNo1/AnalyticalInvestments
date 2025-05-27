import { Link } from "wouter";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Analytical Investments</h3>
            <p className="text-gray-300 leading-relaxed">
              Making powerful AI-enhanced investing tools accessible and affordable for everyone.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@analyticalinvestments.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Platform</h4>
            <div className="space-y-2">
              <Link href="/dashboard">
                <span className="block text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </span>
              </Link>
              <Link href="/education">
                <span className="block text-gray-300 hover:text-white transition-colors">
                  Education Hub
                </span>
              </Link>
              <Link href="/pricing" >
                <span className="block text-gray-300 hover:text-white transition-colors">
                  OMEGA AI
                </span>
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <div className="space-y-2">
              <Link href="/about">
                <span className="block text-gray-300 hover:text-white transition-colors">
                  About
                </span>
              </Link>
              <a
                href="/faq"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Careers
              </a>
              <a
                href="mailto:contact@analyticalinvestments.com"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Legal</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Compliance
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Security
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Analytical Investments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
