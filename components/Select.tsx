import * as React from "react";

export type OptionType = { value: string; label: string };

type SelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  name?: string;
  options?: OptionType[];
  defaultValue?: string;
};

export type OptionProps = {
  option: OptionType;
  onOptionClick: (onOptionChange: OptionType) => void;
  handleKeyDown: (value: string) => (event: React.KeyboardEvent) => void;
  selected: string;
};

const Option: React.FC<OptionProps> = ({
  option,
  onOptionClick,
  handleKeyDown,
  selected,
}) => {
  return (
    <li
      id={option.value}
      role="option"
      aria-selected={selected == option.value}
      tabIndex={0}
      onKeyDown={handleKeyDown(option.value)}
      onClick={() => onOptionClick(option)}
    >
      {option.label}
    </li>
  );
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  name,
  options,
  defaultValue,
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const indexSelectedOption = React.useMemo(
    () => options.findIndex((option) => option.value === value),
    [value, options]
  );

  const onOptionChange = (option) => {
    onChange(option.value);
    setOpen(false);
  };
  const toggleOptions = () => {
    setOpen(!isOpen);
  };

  const handleKeyDown = (value) => (e) => {
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
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevOption = options?.[indexSelectedOption - 1];

          if (prevOption) onOptionChange(prevOption.value);
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

  const otherOptions = options.filter((option) => option.value !== value);

  return (
    <div className="select-wrapper">
      <div className="select-container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={isOpen ? "expanded" : ""}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
        >
          {options[indexSelectedOption]?.label || defaultValue}
        </button>
        <ul
          className={`options ${isOpen ? "show" : ""}`}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {otherOptions.map((option) => (
            <Option
              option={option}
              key={option.value}
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
