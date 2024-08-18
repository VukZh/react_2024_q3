import { useState, useRef } from 'react';
import styles from './Autocomplete.module.css';

type Option = {
  label: string;
  value: string;
};

type AutocompleteProps = {
  options: Option[];
  name: string;
  onInputChange: (value: string) => void;
};

const AutocompleteRHF: React.FC<AutocompleteProps> = ({
  options,
  name,
  onInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.value = selectedValue;
    }
    onInputChange(selectedValue);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setIsOpen(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      autocompleteRef.current &&
      autocompleteRef.current.contains &&
      !autocompleteRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={autocompleteRef}
      className={styles.autocomplete}
      onMouseDown={handleMouseDown}>
      <label htmlFor="country">Countries:</label>
      <input
        type="text"
        name={name}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        id="country"
        className={styles.inputCountry}
        placeholder="Select country"
      />
      {isOpen && (
        <ul className={styles.options}>
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onMouseDown={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteRHF;
