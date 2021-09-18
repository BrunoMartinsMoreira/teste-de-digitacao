import React, { useState } from "react";

const MAX_TYPED_KEYS = 30;

const App = () => {
  const [typedKeys, setTypedKeys] = useState([]);

  const handleKeyDown = (event) => {
    event.preventDefault();
    const { key } = event;
    setTypedKeys((prevTypedKeys) => {
      return [...prevTypedKeys, key].slice(MAX_TYPED_KEYS * -1); // * -1 pra ser -30
    });
  };

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="valid-keys">
        <span className="matched">pip</span>
        <span className="remainder">oca</span>
      </div>

      <div className="typed-keys">{typedKeys ? typedKeys.join(" ") : null}</div>

      <div className="completed-words">
        <ol>
          <li>papibaquígrafo</li>
          <li>Genoveva</li>
          <li>jurubeba</li>
        </ol>
      </div>
    </div>
  );
};

export default App;
