import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 180px;
  @media (min-width: 530px) and (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const DropdownItem = styled.div`
  height: 35px;
  font-size: 16px;
  color: #1e1e1e;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  display: flex;
  align-items: center;
  padding: 0 7px;
  font-weight: ${({ isSelected }) => (isSelected ? '600' : 'normal')};
  &:hover {
    background-color: #83bf4633;
  }
`;
const Arrows = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 4px;
    width: 4px;
  }
`;
const DropdownToggle = styled.button`
cursor: pointer;
       width: 180px;
  height: 40px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 12px;
  background: var(--Main, #263750);
  border-radius: 8px;
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -1px;
  justify-content: flex-start;
  align-items: center;
    border: none; /* убираем стандартную границу */
  gap: 8px;
  display: inline-flex;
  @media (min-width: 530px) and (max-width: 950px) {
  width: 150px;
  height: 40px;
    border: none; /* убираем стандартную границу */
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 12px;
  background: var(--Main, #263750);
  border-radius: 8px;
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -0.50px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: inline-flex;
  }
@media (max-width: 530px) {
    width: 240px;
  height: 40px;
  min-width: 240px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 12px;
    border: none; /* убираем стандартную границу */
  background: var(--Main, #263750);
  border-radius: 8px;
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -0.50px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: inline-flex;
}
    }
&:hover {
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -1px;
  background: var(--Light-Main, #334466);
}
&:focus {
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -1px;
    background: var(--Light-Main, #334466);
}
&:active {
  outline: 1px var(--Accent, #83BF46) solid;
  outline-offset: -1px;
}
  `;
const dropdownStyles = {
  placeholderText: {
    color: 'var(--Text-Default-Tertiary, #B3B3B3)',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '16px',
    wordWrap: 'break-word'
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: '16px'
  }
};

export function Dropdown({
  value,
  options,
  onChange,
  placeholder,
  placeholderStyle,
  id
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const fakeEvent = {
      target: {
        value: option.value
      }
    };
    onChange(fakeEvent);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const textStyle = isPlaceholder
    ? { ...dropdownStyles.placeholderText, ...placeholderStyle }
    : dropdownStyles.selectedText;

  return (
    <DropdownWrapper ref={dropdownRef}>
      {' '}
      {/* ДОБАВЬТЕ ref={dropdownRef} */}
      <DropdownToggle onClick={toggleDropdown}>
        <span style={textStyle}>{displayText}</span>
        <Arrows>
          {selectedOption ? (
            ''
          ) : isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          )}
        </Arrows>
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem
              key={option.value}
              isSelected={value === option.value}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}
