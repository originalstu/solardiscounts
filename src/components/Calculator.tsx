import { useState } from 'react';
import { Home, DollarSign, Battery, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calculator() {
  const [monthlyBill, setMonthlyBill] = useState('300');
  const [roofSpace, setRoofSpace] = useState('30');
  const [sunlight, setSunlight] = useState('5');

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    const space = parseFloat(roofSpace);
    const sun = parseFloat(sunlight);
    
    // Simple calculation for demo purposes
    const yearlyBill = bill * 12;
    const potentialSavings = yearlyBill * 0.7 * (sun/5) * (space/30);
    const systemSize = (space * 0.15).toFixed(1);
    
    return {
      yearly: potentialSavings.toFixed(2),
      systemSize,
      co2: (potentialSavings * 0.0007).toFixed(1)
    };
  };

  const savings = calculateSavings();

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Calculate Your Solar Savings
          </h2>
          <p className="text-xl text-gray-600">
            Use our AI-powered calculator to estimate your potential savings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Bill (AUD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Roof Space (m²)
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={roofSpace}
                    onChange={(e) => setRoofSpace(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Daily Sunlight Hours
                </label>
                <div className="relative">
                  <Sun className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={sunlight}
                    onChange={(e) => setSunlight(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 rounded-2xl text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Your Potential Savings</h3>
            <div className="space-y-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
                <div className="text-sm opacity-80">Yearly Savings</div>
                <div className="text-3xl font-bold">AUD ${savings.yearly}</div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
                <div className="text-sm opacity-80">Recommended System Size</div>
                <div className="text-3xl font-bold">{savings.systemSize} kW</div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-lg">
                <div className="text-sm opacity-80">CO₂ Reduction</div>
                <div className="text-3xl font-bold">{savings.co2} tonnes/year</div>
              </div>

              <button className="w-full bg-white text-orange-500 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors">
                Get Detailed Report
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}