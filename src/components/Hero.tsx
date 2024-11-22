import { useState } from 'react';
import { ArrowRight, Battery, Sun, Zap } from 'lucide-react';
import QuizModal from './QuizModal';

export default function Hero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full mb-6">
              <Sun className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm text-yellow-700">AI-Powered Solar Solutions</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Say Goodbye to your
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"> Electricity Bill</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our AI technology finds the perfect solar solution to slash your electricity bills, Join thousands of Australians already saving with Solar Discounts.
            </p>
            <div>
              <button 
                onClick={() => setIsQuizOpen(true)}
                className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                Calculate Your Discounts Now!
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 w-72 h-72 bg-yellow-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -z-10 w-72 h-72 bg-orange-300 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{left: '20%', top: '20%'}}></div>
            <img 
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80"
              alt="Solar panels under a bright blue sky"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: <Zap className="h-6 w-6 text-yellow-500" />,
              title: "Instant Savings",
              description: "Start saving up to 70% on your electricity costs from day one"
            },
            {
              icon: <Battery className="h-6 w-6 text-yellow-500" />,
              title: "Energy Independence",
              description: "Break free from rising energy costs with our battery solutions"
            },
            {
              icon: <Sun className="h-6 w-6 text-yellow-500" />,
              title: "Renter Friendly",
              description: "Special solutions for renters to benefit from solar savings"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <QuizModal 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}