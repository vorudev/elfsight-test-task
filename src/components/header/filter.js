import { useState, useEffect } from 'react';
import { useData } from '../providers';
import styled from 'styled-components';
import { Dropdown } from '../dropdown/Dropdown';
const FilterPanel = () => {
  const { filters, applyFilters, clearFilters } = useData();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    applyFilters(localFilters, 1);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: ''
    });
    clearFilters();
  };

  const handleClearFilterGender = () => {
    handleInputChange('gender', '');
  };
  const handleClearFilterStatus = () => {
    handleInputChange('status', '');
  };
  const handleClearFilterSpecies = () => {
    handleInputChange('species', '');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  return (
    <Container>
      <DropdownWrapper>
        <Dropdown
          value={localFilters.status}
          id="status"
          options={[
            { value: 'alive', label: 'Alive' },
            { value: 'dead', label: 'Dead' },
            { value: 'unknown', label: 'Unknown' }
          ]}
          onChange={(e) => handleInputChange('status', e.target.value)}
          placeholder="Status"
        />
        {localFilters.status && (
          <DropdownDeselector
            onClick={handleClearFilterStatus}
            className="clear-button"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </DropdownDeselector>
        )}
      </DropdownWrapper>
      <DropdownWrapper>
        <Dropdown
          value={localFilters.species}
          id="species"
          options={[
            { value: 'human', label: 'Human' },
            { value: 'robot', label: 'Robot' },
            { value: 'mythological', label: 'Mythological' },
            { value: 'animal', label: 'Animal' },
            { value: 'humanoid', label: 'Humanoid' },
            { value: 'alien', label: 'Alien' }
          ]}
          onChange={(e) => handleInputChange('species', e.target.value)}
          placeholder="Species"
        />
        {localFilters.species && (
          <DropdownDeselector
            onClick={handleClearFilterSpecies}
            className="clear-button"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </DropdownDeselector>
        )}
      </DropdownWrapper>

      <DropdownWrapper>
        <Dropdown
          value={localFilters.gender}
          id="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'genderless', label: 'Genderless' },
            { value: 'unknown', label: 'Unknown' }
          ]}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          placeholder="Gender"
        />
        {localFilters.gender && (
          <DropdownDeselector
            onClick={handleClearFilterGender}
            className="clear-button"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#ffffff"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </DropdownDeselector>
        )}
      </DropdownWrapper>

      <InputName
        type="text"
        placeholder="Name"
        value={localFilters.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <InputType
        type="type"
        placeholder="Type"
        value={localFilters.type}
        onChange={(e) => handleInputChange('type', e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <ButtonContainer>
        <ApplyButton onClick={handleApplyFilters}>Apply</ApplyButton>
        <ClearButton onClick={handleClearFilters}>Clear </ClearButton>
      </ButtonContainer>
    </Container>
  );
};

export { FilterPanel };

const Container = styled.div` 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 561px;
  @media (max-width: 530px) {
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 15px;
  justify-items: center; 
  }
  @media (min-width: 530px) and (max-width: 950px) {
width: 482px;
height: 97px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  }
}
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  @media (min-width: 530px) and (max-width: 950px) {
  width: 150px;
  }
  @media (max-width: 530px) {
    flex-direction: column;
    width: 100%;
  align-items: center;
  
  }
}
`;
const ApplyButton = styled.button`
  background-color: transparent;
  border: 1px solid #83bf46;

  color: #83bf46;

  border-radius: 8px;
  font-size: 16px;
  width: 85px;
  height: 40px;
  cursor: pointer;
  @media (min-width: 530px) and (max-width: 950px) {
    width: 70px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
  &:hover {
    background-color: #83bf46;
    color: #fff;
  }
`;
const ClearButton = styled.button`
  background-color: transparent;
  border: 1px solid #ff5152;

  color: #ff5152;

  border-radius: 8px;
  font-size: 16px;
  width: 85px;
  height: 40px;
  cursor: pointer;
  @media (min-width: 530px) and (max-width: 950px) {
    width: 70px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
  &:hover {
    background-color: #ff5152;
    color: #fff;
  }
`;
const InputName = styled.input`
  padding: 12px 16px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  font-size: 16px;
  color: #fff;
  width: 180px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  @media (min-width: 530px) and (max-width: 950px) {
    width: 150px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
  &:hover {
    background-color: #334466;
    border-top: 1px solid var(--Accent, #83bf46);
  }
  &:focus {
    background-color: #334466;
    outline: none !important;
    outline-width: 0 !important;
    outline-style: none !important;
    outline-color: transparent !important;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`;
const InputType = styled.input`
  padding: 12px 16px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  font-size: 16px;
  color: #fff;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  box-sizing: border-box;
  @media (min-width: 530px) and (max-width: 950px) {
    width: 150px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
  &:hover {
    background-color: #334466;
    border-top: 1px solid var(--Accent, #83bf46);
  }
  &:focus {
    background-color: #334466;
    outline: none !important;
    outline-width: 0 !important;
    outline-style: none !important;
    outline-color: transparent !important;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`;
const DropdownWrapper = styled.div`
  position: relative;
`;
const DropdownDeselector = styled.button`
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

  &:hover {
    color: #83bf46;
  }
`;
const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  font-size: 16px;
  color: #fff;
  width: 180px;
  height: 40px;
  box-sizing: border-box;

  &:hover {
    background-color: #334466;
    border-top: 1px solid var(--Accent, #83bf46);
  }
`;
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ${(props) => !props.isOpen && 'display: none;'}
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }

  ${(props) =>
    props.isSelected &&
    `
    background-color: #007bff;
    color: white;
  `}
`;
