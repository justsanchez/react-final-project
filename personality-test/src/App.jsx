import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';

import UserProvider from './components/UserContext';

function App() {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handleUserNameSubmit(name) {
    setUserName(name);
  }

  function calculateElement(answers) {
    const counts = {};
    
    // Iterate through the answers array
    answers.forEach((answer) => {
        // Map each answer to its corresponding element
        const element = elements[answer];
        
        // Increment the count for this element in the counts object
        counts[element] = (counts[element] || 0) + 1;
    });

    // Find the key in counts with the highest value
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

  async function fetchArtwork(elementKeyword, attempts = 3) {
    try {
        const objectId = Math.floor(Math.random() * (45822 - 10000 + 1)) + 10000;
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        );
        const data = await response.json();
        console.log('data: ', data);
        if ((!data || !data.primaryImage) && attempts > 0 ){
          return fetchArtwork(elementKeyword, attempts - 1);
        }

      setArtwork(data);
    } catch (error) {
      console.error("Failed to fetch artwork:", error);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = calculateElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  return (
    <>
      {/* wrapping the application in the UserProvider to share the global state */}
      {/* (userName and setUserName) */}
      {/* with all the components inside the routes */}
      {/* this ensures the context is accessible through the application */}
      <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
        <Routes>
          <Route path="/" element={
            <UserForm onSubmit={handleUserNameSubmit} />
            } />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;