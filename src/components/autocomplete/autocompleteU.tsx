import { useState, useRef, useEffect } from 'react';
import styles from './Autocomplete.module.css';

type Option = {
  label: string;
  value: string;
};

type AutocompleteProps = {
  options: Option[];
  name: string;
};

const AutocompleteU: React.FC<AutocompleteProps> = ({
  options,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const matchedOption = options.find(
      (option) => option.value.toLowerCase() === inputValue.toLowerCase(),
    );
    if (matchedOption) {
      setResultValue(matchedOption.value);
    } else {
      setResultValue('');
    }
  }, [inputValue]);

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setIsOpen(false);
    if (inputRef.current) {
      if ('value' in inputRef.current) {
        inputRef.current.value = selectedValue;
      }
    }
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
      autocompleteRef.current?.contains &&
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
        value={isOpen ? inputRef.current?.value : resultValue}
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

export default AutocompleteU;
