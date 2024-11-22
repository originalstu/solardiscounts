import { useState } from 'react';
import { QuizProvider, useQuiz } from './QuizContext';
import QuizStep from './QuizStep';
import * as Yup from 'yup';
import { addContact } from '../../lib/airtable';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Home, Zap, User, Mail, Phone, FileUp } from 'lucide-react';

const steps = [
  {
    title: "Step 1 of 7",
    description: "Do you own your home?",
    subtitle: "To qualify for solar rebates, you need to be the property owner",
    icon: <Home className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "ownership",
        label: "Select an option",
        type: "select",
        options: [
          { value: "Own", label: "Yes, I own my home" },
          { value: "Rent", label: "No, I'm renting" }
        ]
      }
    ],
    validationSchema: {
      ownership: Yup.string().required("Please select an option")
    }
  },
  {
    title: "Step 2 of 7",
    description: "What's your average monthly electricity bill?",
    subtitle: "This helps us calculate your potential savings",
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "electricityBill",
        label: "Select your monthly bill",
        type: "select",
        options: [
          { value: "$0-$200", label: "$0-$200" },
          { value: "$201-$400", label: "$201-$400" },
          { value: "$401-$600", label: "$401-$600" },
          { value: "$601-$800", label: "$601-$800" },
          { value: "$801+", label: "$801+" }
        ]
      }
    ],
    validationSchema: {
      electricityBill: Yup.string().required("Please select your monthly bill")
    }
  },
  {
    title: "Step 3 of 7",
    description: "What's your address?",
    subtitle: "We'll check solar panel compatibility for your roof",
    icon: <Home className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "address",
        label: "Start typing your address...",
        type: "address"
      }
    ],
    validationSchema: {
      address: Yup.string().required("Address is required")
    }
  },
  {
    title: "Step 4 of 7",
    description: "What's your name?",
    icon: <User className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "John Smith"
      }
    ],
    validationSchema: {
      name: Yup.string().required("Full name is required")
    }
  },
  {
    title: "Step 5 of 7",
    description: "What's your email address?",
    subtitle: "We'll send your solar savings estimate here",
    icon: <Mail className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "john@example.com"
      }
    ],
    validationSchema: {
      email: Yup.string().email("Invalid email").required("Email is required")
    }
  },
  {
    title: "Step 6 of 7",
    description: "What's your phone number?",
    subtitle: "We'll only use this to discuss your solar options",
    icon: <Phone className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "0400 000 000"
      }
    ],
    validationSchema: {
      phone: Yup.string()
        .matches(/^0[0-9]{9}$/, "Must be a valid Australian mobile number")
        .required("Phone number is required")
    }
  },
  {
    title: "Step 7 of 7",
    description: "Upload your electricity bill",
    subtitle: "Upload up to 4 files (PDF or images up to 10MB each)",
    icon: <FileUp className="h-6 w-6 text-yellow-500" />,
    fields: [
      {
        name: "files",
        label: "Upload bills",
        type: "files",
        accept: ".pdf,.jpg,.jpeg,.png"
      }
    ],
    validationSchema: {
      files: Yup.array()
        .min(1, "Please upload at least one bill")
        .max(4, "Maximum 4 files allowed")
        .required("Please upload your electricity bill")
    }
  }
];

function QuizContent() {
  const { currentStep, answers, setCurrentStep, setAnswers } = useQuiz();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting || isComplete) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Validate required fields
      if (!answers.name || !answers.email || !answers.address || !answers.phone || 
          !answers.ownership || !answers.electricityBill || !answers.files?.length) {
        throw new Error('Please complete all required fields');
      }

      // Submit to Airtable
      await addContact(
        answers.name,
        answers.email,
        answers.phone,
        answers.address,
        answers.files,
        {
          homeOwnership: answers.ownership,
          electricityBill: answers.electricityBill
        }
      );

      setIsComplete(true);
      toast.success("Thank you! We'll be in touch soon with your solar savings estimate.");
    } catch (err: any) {
      console.error('Form submission error:', err);
      toast.error(err.message || 'Failed to submit form');
      setError(err.message || 'Failed to submit form');
      setCurrentStep(steps.length - 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only attempt submission once we reach the last step
  if (currentStep === steps.length && !isComplete && !isSubmitting && !error) {
    handleSubmit();
  }

  if (currentStep >= steps.length) {
    return (
      <div className="text-center p-8">
        {isSubmitting ? (
          <div className="animate-pulse">
            <h2 className="text-2xl font-bold text-white mb-4">Submitting...</h2>
            <p className="text-white/90">Please wait while we process your information.</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 backdrop-blur-md p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
            <p className="text-white/90 mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setCurrentStep(steps.length - 1);
              }}
              className="px-6 py-2 bg-white text-red-600 rounded-lg hover:bg-white/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
              <p className="text-xl mb-4 text-white">We're Checking Your Eligibility!</p>
              <p className="mb-4 text-white/90">We'll email your solar savings estimate shortly.</p>
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="font-semibold text-white">Summary:</p>
                <ul className="mt-2 space-y-1 text-left text-white/90">
                  <li>Name: {answers.name}</li>
                  <li>Monthly Bill: {answers.electricityBill}</li>
                  <li>Home Ownership: {answers.ownership}</li>
                  <li>Address: {answers.address}</li>
                  <li>Files: {answers.files?.length} uploaded</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <QuizStep key={currentStep} step={steps[currentStep]} />
    </AnimatePresence>
  );
}

export default function Quiz() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}