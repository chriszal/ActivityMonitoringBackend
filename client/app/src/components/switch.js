import styled from '@emotion/styled';
import { useState } from 'react';

const Switch = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3em;
  height: 1.5em;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1em;
    width: 1em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: ${({toggled}) => toggled ? "#10B981" : "#2196F3"};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(1.5em);
  }
`;

const SwitchComponent = () => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  return (
    <Switch toggled={toggled}>
      <input type="checkbox" onChange={handleToggle} />
      <span className="slider"></span>
    </Switch>
  );
};

export default SwitchComponent;
