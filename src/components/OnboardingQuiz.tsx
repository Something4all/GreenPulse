import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from '../data/questions';
import { QuizAnswer, QuizQuestion } from '../types';
import { 
  Car, 
  Utensils, 
  Home, 
  ShoppingBag, 
  Plane, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

interface OnboardingQuizProps {
  presetId?: string;
  onComplete: (baseline: number, categoryBreakdown: Record<string, number>) => void;
}

const getInitialAnswers = (id?: string) => {
  const initialAnswers: Record<string, QuizAnswer> = {};
  if (id === 'jane') {
    initialAnswers['commute'] = quizQuestions[0].options[1]; // compact
    initialAnswers['diet'] = quizQuestions[1].options[0]; // meat
    initialAnswers['home'] = quizQuestions[2].options[1]; // apartment
    initialAnswers['shopping'] = quizQuestions[3].options[0]; // active consumer
    initialAnswers['travel'] = quizQuestions[4].options[0]; // jetsetter
  } else if (id === 'carlos') {
    initialAnswers['commute'] = quizQuestions[0].options[0]; // standard solo
    initialAnswers['diet'] = quizQuestions[1].options[1]; // balanced
    initialAnswers['home'] = quizQuestions[2].options[0]; // house grid
    initialAnswers['shopping'] = quizQuestions[3].options[1]; // mindful
    initialAnswers['travel'] = quizQuestions[4].options[3]; // staycationer
  } else if (id === 'anya') {
    initialAnswers['commute'] = quizQuestions[0].options[2]; // public transit
    initialAnswers['diet'] = quizQuestions[1].options[3]; // vegan
    initialAnswers['home'] = quizQuestions[2].options[2]; // clean solar
    initialAnswers['shopping'] = quizQuestions[3].options[2]; // minimalist
    initialAnswers['travel'] = quizQuestions[4].options[3]; // staycationer
  }
  return initialAnswers;
};

export default function OnboardingQuiz({ presetId, onComplete }: OnboardingQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, QuizAnswer>>(() => getInitialAnswers(presetId));
  const [tempSelected, setTempSelected] = useState<QuizAnswer | null>(() => {
    const prefilled = getInitialAnswers(presetId);
    return prefilled[quizQuestions[0].id] || null;
  });

  const currentQuestion = quizQuestions[currentIndex];

  const getIcon = useCallback((iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-8 h-8 text-brand-green" aria-hidden="true" />;
      case 'Utensils': return <Utensils className="w-8 h-8 text-brand-orange" aria-hidden="true" />;
      case 'Home': return <Home className="w-8 h-8 text-brand-dark" aria-hidden="true" />;
      case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-brand-green" aria-hidden="true" />;
      case 'Plane': return <Plane className="w-8 h-8 text-brand-orange" aria-hidden="true" />;
      default: return <Sparkles className="w-8 h-8 text-brand-green" aria-hidden="true" />;
    }
  }, []);

  const handleSelectOption = useCallback((answer: QuizAnswer) => {
    setTempSelected(answer);
  }, []);

  const handleNext = useCallback(() => {
    if (!tempSelected) return;

    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: tempSelected
    };
    setSelectedAnswers(updatedAnswers);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // If we previously answered the next question, pre-fill the selection, else clear it
      const nextQuestionId = quizQuestions[currentIndex + 1].id;
      setTempSelected(updatedAnswers[nextQuestionId] || null);
    } else {
      // Finished all 5 questions
      let totalBaseline = 0;
      const breakdown: Record<string, number> = {};
      
      quizQuestions.forEach(q => {
        const ans = updatedAnswers[q.id];
        if (ans) {
          totalBaseline += ans.value;
          breakdown[q.category] = ans.value;
        }
      });
      
      onComplete(Number(totalBaseline.toFixed(2)), breakdown);
    }
  }, [currentIndex, currentQuestion.id, onComplete, selectedAnswers, tempSelected]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevQuestionId = quizQuestions[currentIndex - 1].id;
      setTempSelected(selectedAnswers[prevQuestionId] || null);
    }
  }, [currentIndex, selectedAnswers]);

  // Safe estimation calculated on the fly as the user answers
  const currentRunningTotal = useMemo(() => {
    const activeValues = Object.values({
      ...selectedAnswers,
      [currentQuestion.id]: tempSelected
    }).filter(val => val !== null) as QuizAnswer[];
    
    return activeValues.reduce((sum, item) => sum + item.value, 0);
  }, [selectedAnswers, currentQuestion.id, tempSelected]);

  return (
    <div id="onboarding-container" className="max-w-3xl mx-auto px-4 py-8">
      {/* Header and Privacy assurance */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-brand-light border border-brand-border text-brand-green text-xs px-3 py-1.5 rounded-full font-medium mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
          <span>Local, Privacy-First Calculation • No Bank Credentials Needed</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Baseline Lifecycle Quiz
        </h1>
        <p className="mt-2 text-sm text-brand-muted max-w-lg mx-auto">
          {presetId 
            ? "We’ve preloaded your preset’s active lifestyle choices. Step through to confirm or customize your baseline footprint."
            : "Let’s estimate your annual footprint in 5 effortless choices. No tedious daily logging or invasive accounts required."
          }
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-brand-muted font-medium mb-2">
          <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
          <span>Baseline Estimate: {currentRunningTotal.toFixed(1)} t CO₂e/yr</span>
        </div>
        <div className="w-full bg-brand-light h-2.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-brand-green h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-brand-light rounded-xl">
              {getIcon(currentQuestion.iconName)}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                Category: {currentQuestion.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mt-1">
                {currentQuestion.title}
              </h2>
              <p className="text-xs text-brand-muted mt-1">
                {currentQuestion.description}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = tempSelected?.text === option.text;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  id={`onboarding-option-${index}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between group cursor-pointer ${
                    isSelected 
                      ? 'border-brand-green bg-brand-light ring-1 ring-brand-green' 
                      : 'border-brand-border bg-white hover:border-brand-muted hover:bg-brand-extralight'
                  }`}
                >
                  <div className="pr-4 flex-1">
                    <p className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-brand-green' : 'text-brand-dark'}`}>
                      {option.text}
                    </p>
                    {isSelected && (
                      <p className="text-xs text-brand-muted mt-1.5 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-brand-border/60">
                        {option.explanation}
                      </p>
                    )}
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-brand-border'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center border-t border-brand-border pt-6">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              id="quiz-back-btn"
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentIndex === 0 
                  ? 'text-brand-border cursor-not-allowed' 
                  : 'text-brand-muted hover:text-brand-dark hover:bg-brand-light'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!tempSelected}
              id="quiz-next-btn"
              className={`flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
                tempSelected 
                  ? 'bg-brand-green text-white hover:bg-brand-dark shadow-sm' 
                  : 'bg-brand-light text-brand-subtle cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === quizQuestions.length - 1 ? 'Calculate My Baseline' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 items-center justify-center mt-6 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Calculated using IPCC & carbon coefficient factors</span>
        </div>
      </div>
    </div>
  );
}
