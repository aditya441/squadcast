import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import { usersData } from './utils';

function TaggableInput() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);

    // Check if the input contains @
    if (text.includes('@')) {
      // Filter users whose names start with the entered text after @
      const query = text.split('@').slice(-1)[0].toLowerCase();
      const matchingUsers = usersData.filter((user) =>
        user.first_name.toLowerCase().startsWith(query)
      );
      setSuggestions(matchingUsers);
    } else {
      setSuggestions([]);
    }
  };

  const handleUserClick = (userName) => {
    const currentInputValue = inputValue.replace(/\s+$/, ''); // Remove trailing whitespace
    const updatedInputValue =
      currentInputValue.endsWith('@') || currentInputValue.endsWith(' ')
        ? `${currentInputValue}${userName} `
        : `${currentInputValue} @${userName} `;
    setInputValue(updatedInputValue);
    setSuggestions([]);
  };

  return (
    <div className="centered-container">
    <div className="taggable-input-container">
      <textarea
        placeholder="Type your message here..."
        value={inputValue}
        onChange={handleInputChange}
        className="taggable-textarea"
      />
      {suggestions.length > 0 && (
        <div className="popover">
          {suggestions.map((user, index) => (
            <span
              key={index}
              className="suggestion"
              onClick={() => handleUserClick(user.first_name)}
            >
              {user.first_name}
            </span>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default TaggableInput;
