import React, { useEffect, useRef, useState } from 'react';
import "./App.css"

const App = () => {
  const [text, setText] = useState('');
 
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(5 * 60);
  const [nextKeys, setNextKeys] = useState('');

  const [showResults, setShowResults] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
   
      calculateAccuracy();
      setShowResults(true);
    }
  }, [timer]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    setNextKeys('There is something in us, as storytellers and as listeners to stories, that demands the redemptive act, that demands that what falls at least be offered the chance to be restored. The reader of today looks for this motion, and rightly so, but what he has forgotten is the cost of it. His sense of evil is diluted or lacking altogether, and so he has forgotten the price of restoration. When he reads a novel, he wants either his sense tormented or his spirits raised. He wants to be transported, instantly, either to mock damnation or a mock innocence.'); // Replace with your desired text
  }, []);

  const handleInputChange = (e) => {
   

    setText(e.target.value);
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    calculateAccuracy();
    setShowResults(true);
  };

  const calculateAccuracy = () => {
    const typedText = text.trim();
    const originalText = nextKeys.trim();

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === originalText[i]) {
        correctChars++;
      }
    }

    const calculatedAccuracy = (correctChars / originalText.length) * 100;
    setAccuracy(Math.round(calculatedAccuracy));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1 className='heading'>Touch Typing Test </h1>
      <p className='para'>There is something in us, as storytellers and as listeners to stories, that demands the redemptive act, that demands that what falls at least be offered the chance to be restored. The reader of today looks for this motion, and rightly so, but what he has forgotten is the cost of it. His sense of evil is diluted or lacking altogether, and so he has forgotten the price of restoration. When he reads a novel, he wants either his sense tormented or his spirits raised. He wants to be transported, instantly, either to mock damnation or a mock innocence.</p>
      <div className='time'>
      <img src="https://assets.ccbp.in/frontend/dynamic-webapps/clock-img.png" class="img" alt="img"/>
      <p className='timer'> {formatTime(timer)}</p>
      </div>
      
      
      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <p className='type'>Type Above Text To see the results</p>
          <textarea rows="5" cols="50"  className="text"ref={textareaRef} value={text} onChange={handleInputChange} />
          <br/>
          <button className="submit" type="submit">Submit</button>
        </form>
      ) : (
        <div>
         
          <p className='heading'>Accuracy: {accuracy}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
