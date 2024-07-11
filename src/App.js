import { useEffect, useState } from 'react';
import './App.css';
import Answer from './Components/Answer'

function App() {
  const [guesses, setGuesses] = useState(6);
  const [word, setWord] = useState('');
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [allTheWords, setAllTheWords] = useState([])
  const [playerHasWon, setPlayerHasWon] = useState(false)

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        const response = await fetch('https://api.frontendeval.com/fake/word');
        if (!response.ok) {
          throw new Error();
        } else {
          const data = await response.text();
          setWordOfTheDay(data);
        }
      } catch (error) {
        console.error('Error fetching the word of the day:', error);
      }
    };
    fetchWordOfTheDay();
  }, []);

  function checkIfPlayerWon(bool){
    setPlayerHasWon(bool)
  }


  async function checkIfWordIsValid(text) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({word: text})
    };
    
    try {
      const response = await fetch('https://api.frontendeval.com/fake/word/valid', options);
      if(response.ok){
        const data = await response.json();
        return data
      } 
      else{
        throw new Error('Network response was not ok.');
      }
    } 
    catch(error){
      console.error('There was a problem with the fetch operation:', error);
    }
 }

  async function handleEntry(e) {
    if(e.key === 'Enter' && word.length === 5 && guesses && await checkIfWordIsValid(word)){
      setGuesses(guesses - 1)
      setAllTheWords([...allTheWords, word])
      e.target.value = ''
      setWord('')
    } 
    else{
      setWord(e.target.value)
    }
  }
  if(playerHasWon){
    return (
      <div className='App'>
        <h1 className='guess'>You have Correctly Guessed the word in {6 - guesses} Guesses</h1>
        <input
          type="text"
          onKeyUp={handleEntry}
          maxLength={5}
          disabled={true}
        />
        {
          allTheWords.map((elem, index) => (
            <Answer key={index} word={elem} wordOfTheDay={wordOfTheDay} check={checkIfPlayerWon}></Answer>
          ))
        }
      </div>
    );
  }
  else{
    if(guesses > 0){
      return (
        <div className='App'>
        <h3 className='guess'>You have {guesses} guesses remaining:</h3>
        <input
          type="text"
          onKeyUp={handleEntry}
          maxLength={5}
        />
        {
          allTheWords.map((elem, index) => (
            <Answer key={index} word={elem} wordOfTheDay={wordOfTheDay} check={checkIfPlayerWon}></Answer>
          ))
        }
      </div>
      )
    }
    else{
      return (
        <div className='App'>
          <h1 className='guess'>Oooh You lost Better luck Tomorrow</h1>
          <h1 className='guess'>Today's Word was "{wordOfTheDay.toUpperCase()}"</h1>
          <input
            type="text"
            onKeyUp={handleEntry}
            maxLength={5}
            disabled={true}
          />
          {
            allTheWords.map((elem, index) => (
              <Answer key={index} word={elem} wordOfTheDay={wordOfTheDay} check={checkIfPlayerWon}></Answer>
            ))
          }
        </div>
      );
    }
  }
}

export default App;