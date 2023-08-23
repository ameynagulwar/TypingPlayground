import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu.jsx";
import { useTestMode } from "../Context/TestModeContext.jsx";
import Stats from "./Stats.jsx";

const TypingBox = () => {
  // varibable for timer
  const {testTime} = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  
  // variable for clearout the setinterval function to stop the timer
  const [interValId, setInterValId] = useState(null)

  // taking refernce of keys which user type.
  const inputRef = useRef(null);

  // variable for keep track of correct character, incorrect character, extra character , missed character & correct word typed
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setInCorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extratChars, setExtraChars] = useState(0);
  const [correctWord, setCorrectWord] = useState(0);

  // variables for checking wheather test is start or end for keep track on timer
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);


  // dealing with the current word and current characters
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setcurrCharIndex] = useState(0);

  // variable for Graph data
  const [graphData, setGraphData] = useState([])
  
  // generate the random words
  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });


  // function for timer
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setInterValId(intervalId)
    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [...graphData, [
              testTime - latestCountDown + 1,
              (correctChars/5)/((testTime - latestCountDown + 1)/60)
            ]]
          })
          return correctChars;
        })
        // checking that the countdown is reach the 1 or not  || else updating the latestcountdown
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        if(latestCountDown <= (testTime / 2)){
          document.getElementById('count').className = 'counter-red'
        }
        return latestCountDown - 1;
      });
    }
  };
 
  // function for reset the test
  const resetTest = () => {
    clearInterval(interValId)
    setCountDown(testTime);
    setCurrWordIndex(0);
    setcurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50))
    focusInput()
    wordsSpanRefClassName()
  }

  const wordsSpanRefClassName = () => {
      wordsSpanRef.map(i => {
        Array.from(i.current.childNodes).map(j => {
          j.className = '';
        })
      })
      wordsSpanRef[0].current.childNodes[0].className = 'current'
  }

  //  function for calculate word per minutes
   const wordPerMintues = () => {
    return Math.round((correctChars/5)/(testTime/60))
   } 
   
   // function for calculation of Accuracy
   const accuracyOfWords = () => {
    return Math.round((correctWord/currWordIndex) * 100)
   }

  const handleUserWordInput = (event) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
  
    let allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    //conditon for user pressing space
    if (event.keyCode === 32) {

       // for checking the correct word type
       let correctCharsWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct')
           if(correctCharsWord.length === allCurrChars.length){
            setCorrectWord(correctWord + 1)
           }
      if (allCurrChars.length <= currCharIndex) {
        // removing the cursor from last place of the word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } 
      else {
        // removeing the cursor from middle of the word
        setMissedChars(missedChars + (allCurrChars.length - currCharIndex))
        allCurrChars[currCharIndex].classList.remove("current");
      }
      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = "current";
      setCurrWordIndex(currWordIndex + 1);
      setcurrCharIndex(0);
      return;
    }
    // condition for backspace
    if (event.keyCode === 8) {
      // preventing my cursor to move back to the previous word
      if (currCharIndex !== 0) {
        // handling the cursor if it is the last letter of the word
        if (allCurrChars.length === currCharIndex) {
          // condition for checking if the user press extra letter and removing that letter
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } 
          else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setcurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setcurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    // condition if user adding new letter instead of space
    
    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = event.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setExtraChars(extratChars + 1);
      return;
    }
    // condition to check wheather user press correct input or not and display as per result
    if (event.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } 
    else {
      allCurrChars[currCharIndex].className = "incorrect";
      setInCorrectChars(incorrectChars + 1);
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } 
    else {
      allCurrChars[currCharIndex + 1].className = "current";
    }

    setcurrCharIndex(currCharIndex + 1);
  };

  // function triggred the focus function of input

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest()
  }, [testTime])

  useEffect(() => {
    focusInput();
    // inital cursor on 0th word of 0th character.
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length).fill(0).map((i) => createRef(null));
  }, [wordsArray]);

  
  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <div>
          <Stats wpm={wordPerMintues()}
           accuracy={accuracyOfWords()} 
           correctChar={correctChars}
           incorrectChar={incorrectChars}
           missedChar={missedChars}
           extrachar={extratChars}
           graphData={graphData}
           />
        </div>
        
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words-wrapper">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        disabled = {testEnd}
        onKeyDown={handleUserWordInput}
      />
    </div>
  );
};

export default TypingBox;
