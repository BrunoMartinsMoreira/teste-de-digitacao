import React from "react";

const App = () => {
  return (
    <div className="container">
      <div className="valid-keys">
        <span className="matched">pip</span>
        <span className="remainder">oca</span>
      </div>

      <div className="typed-keys">fofneoipipsdrf5ocga</div>

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
