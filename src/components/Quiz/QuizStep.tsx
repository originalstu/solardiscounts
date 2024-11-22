import { motion } from 'framer-motion';
import { useQuiz } from './QuizContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import FileUpload from './FileUpload';

interface QuizStepProps {
  step: {
    title: string;
    description: string;
    subtitle?: string;
    fields: {
      name: string;
      label: string;
      type: string;
      placeholder?: string;
      options?: { value: string; label: string }[];
      accept?: string;
    }[];
    validationSchema: Record<string, any>;
  };
}

export default function QuizStep({ step }: QuizStepProps) {
  const { setCurrentStep, setAnswers, answers } = useQuiz();
  const { title, description, subtitle, fields, validationSchema } = step;

  const initialValues = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: answers[field.name] || (field.type === 'files' ? [] : '')
  }), {});

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      <p className="text-2xl font-bold text-white mb-2">{description}</p>
      {subtitle && <p className="text-white/80 mb-8">{subtitle}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => {
          setAnswers(prev => ({ ...prev, ...values }));
          setCurrentStep(prev => prev + 1);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                {field.type === 'select' ? (
                  <Field
                    as="select"
                    name={field.name}
                    className="w-full p-4 bg-white/10 backdrop-blur border-2 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg"
                  >
                    <option value="">{field.label}</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value} className="bg-blue-800">
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : field.type === 'files' ? (
                  <FileUpload
                    files={values[field.name] || []}
                    onChange={(files) => setFieldValue(field.name, files)}
                  />
                ) : field.name === 'address' ? (
                  <GooglePlacesAutocomplete
                    value={values[field.name]}
                    onSelect={(address) => setFieldValue(field.name, address)}
                    className="w-full p-4 bg-white/10 backdrop-blur border-2 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg placeholder-white/50"
                  />
                ) : (
                  <Field
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || field.label}
                    className="w-full p-4 bg-white/10 backdrop-blur border-2 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg placeholder-white/50"
                  />
                )}
                {errors[field.name] && touched[field.name] && (
                  <div className="text-red-200 text-sm">{errors[field.name]}</div>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-colors mt-8"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}