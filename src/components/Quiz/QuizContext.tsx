import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  currentStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  answers: Record<string, any>;
  setAnswers: (answers: Record<string, any>) => void;
  totalSteps: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  return (
    <QuizContext.Provider 
      value={{ 
        currentStep, 
        setCurrentStep, 
        answers, 
        setAnswers,
        totalSteps: 7 // Total number of steps in the quiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}