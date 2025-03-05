import { Layout } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid  grid-cols-4  gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Layout className="h-6 w-6 text-amber-500" strokeWidth={2} />
              <span className="text-lg font-bold text-gray-900">
                TaskBoard Pro
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              The intuitive task management platform designed to boost
              productivity.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              {["Features", "Pricing", "Integrations", "Customers"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-amber-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {["Blog", "Guides", "Help Center", "API Docs"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-amber-500"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {["About", "Careers", "Contact", "Privacy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-amber-500"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TaskBoard Pro. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Facebook", "Twitter", "Instagram", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-500 hover:text-amber-500"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
