import { motion } from 'framer-motion';
import { Battery, Banknote, Home, Shield, Sun, Zap } from 'lucide-react';

const features = [
  {
    icon: <Battery className="h-6 w-6" />,
    title: "Battery Storage",
    description: "Store excess power for use during peak hours or outages with our advanced battery solutions."
  },
  {
    icon: <Banknote className="h-6 w-6" />,
    title: "Government Rebates",
    description: "Access the latest 2025 solar incentives and rebates available in your area."
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Property Value",
    description: "Increase your property value by up to 4.1% with a modern solar installation."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "25-Year Warranty",
    description: "Peace of mind with industry-leading warranty coverage on panels and installation."
  },
  {
    icon: <Sun className="h-6 w-6" />,
    title: "Smart Monitoring",
    description: "Track your system's performance in real-time with our AI-powered monitoring app."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Zero Down Payment",
    description: "Get started with $0 down and flexible financing options tailored to your needs."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Solar Discounts?
          </h2>
          <p className="text-xl text-gray-600">
            Leading the solar revolution with cutting-edge technology and unmatched service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}