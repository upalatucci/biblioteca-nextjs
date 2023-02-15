import classNames from "classnames";
import React from "react";
import { ALL_LABEL } from "./GoshoList/utils";

type SelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  name?: string;
  options?: string[];
  className?: string;
  placeholder?: string;
};

export type OptionProps = {
  option: string;
  onOptionClick: (onOptionChange: string) => void;
  handleKeyDown: (value: string) => (event: React.KeyboardEvent) => void;
  selected: string;
};

const Option: React.FC<OptionProps> = ({
  option,
  onOptionClick,
  handleKeyDown,
  selected
}) => {
  const _onOptionClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onOptionClick(option);
    },
    [onOptionClick, option]
  );

  return (
    <li
      id={option}
      role="option"
      aria-selected={selected === option}
      tabIndex={0}
      onKeyDown={handleKeyDown(option)}
      onClick={_onOptionClick}
    >
      {option}
    </li>
  );
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  name,
  options,
  className,
  placeholder
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const indexSelectedOption = React.useMemo(
    () => options.findIndex((option) => option === value),
    [value, options]
  );

  const onOptionChange = (option) => {
    onChange(option);
    setOpen(false);
  };
  const toggleOptions = () => {
    setOpen(!isOpen);
  };

  const handleKeyDown = (value) => (e) => {
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        onOptionChange(value);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = React.useCallback(
    (e) => {
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevOption = options?.[indexSelectedOption - 1];

          if (prevOption)
            onOptionChange(
              typeof prevOption === "string" ? prevOption : prevOption
            );
          break;
        case "ArrowDown":
          e.preventDefault();
          const nextOption = options?.[indexSelectedOption + 1];

          if (nextOption) onOptionChange(nextOption);
          break;
        default:
          break;
      }
    },
    [indexSelectedOption]
  );

  const otherOptions = options.filter((option) => option !== value);

  return (
    <div className={classNames("select-wrapper font-serif", className)}>
      {isOpen && (
        <div className="select-background" onClick={() => setOpen(false)}></div>
      )}
      <select
        className="hidden"
        defaultValue={value}
        name={name}
        aria-label={options[indexSelectedOption]}
      ></select>
      <div className="select-container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={isOpen ? "expanded" : ""}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
        >
          {options[indexSelectedOption] === ALL_LABEL
            ? placeholder || ALL_LABEL
            : options[indexSelectedOption]}
        </button>
        <ul
          className={`options max-h-64 overflow-y-scroll ${
            isOpen ? "show" : ""
          }`}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {otherOptions.map((option) => (
            <Option
              option={option}
              key={option}
              handleKeyDown={handleKeyDown}
              selected={value}
              onOptionClick={onOptionChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
