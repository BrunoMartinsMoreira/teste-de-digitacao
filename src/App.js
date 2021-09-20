import React, { useState, useEffect } from "react";
import wordList from "./resources/words.json";

const MAX_TYPED_KEYS = 1000;

const getWord = () => {
  const index = Math.floor(Math.random() * wordList.length);
  const word = wordList[index];
  return word.toLocaleLowerCase();
};

const isValidKey = (key, word) => {
  if (!word) return false;
  const result = word.split("").includes(key);
  return result;
};

const Word = ({ word, validKeys }) => {
  if (!word) return null;
  const joinedKeys = validKeys.join("");
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);

  return (
    <>
      <span className="matched">{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  );
};

const App = () => {
  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState("");
  //const [countValids, setCountValids] = useState(0);
  const countKeys = Number(typedKeys.length);

  useEffect(() => {
    setWord(getWord());
  }, []);

  useEffect(() => {
    const wordFromValidKeys = validKeys.join("").toLocaleLowerCase();
    if (word && word === wordFromValidKeys) {
      //buscar um nova palavra
      let newWord = null;
      do {
        newWord = getWord();
      } while (completedWords.includes(newWord));
      setWord(newWord);
      //limpar o array validKeys
      setValidKeys([]);
      //add word ao completedWords
      setCompletedWords((prevCompleted) => [...prevCompleted, word]);
    }
  }, [word, validKeys, completedWords]);

  const handleKeyDown = (event) => {
    event.preventDefault();
    const { key } = event;

    setTypedKeys((prevTypedKeys) =>
      [...prevTypedKeys, key].slice(MAX_TYPED_KEYS * -1),
    );

    if (isValidKey(key, word)) {
      setValidKeys((prevValidKey) => {
        const isValidLength = prevValidKey.length <= word.length;
        const isNextChar = isValidLength && word[prevValidKey.length] === key;
        return isNextChar ? [...prevValidKey, key] : prevValidKey;
      });
    }
  };

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>

      {/*<div className="typed-keys">{typedKeys ? typedKeys.join(" ") : null}</div>*/}
      <div className="countkeys">Total de teclas digitadas: {countKeys}</div>

      <div className="completed-words">
        <ol>
          {completedWords.map((word) => {
            return <li key={word}>{word}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default App;
