import secondBG from '../../public/assets/Assessment-Program/AR02.png';
import { resultsSections } from './quizz';
import Header from '@/components/Header';
import ResultsPageContent from '@/components/ResultsPageContent';

const Results = () => {
  const progress = 8;

  return (
    <div className='max-w-screen-2xl mx-auto' lang='ar' dir='rtl'>
      <Header /> 
      <main
        className='container-px py-6 min-h-screen bg-cover bg-right'
        style={{ backgroundImage: `url(${secondBG})` }}
      >
        <ResultsPageContent 
          currentSection={1}
          sections={resultsSections}
          progress={progress}
        />
      </main>
    </div>
  );
};

export default Results;