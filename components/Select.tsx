import { debounce } from "@utils/utils";
import classNames from "classnames";
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
  onOptionChange: (value: string) => void;
  selected: string;
};

const updateScroll = (list, selectedOption) => {
  if (selectedOption && list.scrollHeight > list.clientHeight) {
    const scrollBottom = list.clientHeight + list.scrollTop;
    const elementBottom =
      selectedOption.offsetTop + selectedOption.offsetHeight;
    if (elementBottom > scrollBottom) {
      list.scrollTop = elementBottom - list.clientHeight;
    } else if (selectedOption.offsetTop < list.scrollTop) {
      list.scrollTop = selectedOption.offsetTop;
    }
  }
};

const Option: React.FC<OptionProps> = ({
  option,
  onOptionChange,
  selected,
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        onOptionChange(option);
        e.currentTarget.focus();
        break;
      default:
        break;
    }
  };

  const onOptionClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onOptionChange(option);
    },
    [onOptionChange, option]
  );

  return (
    <li
      id={option}
      role="option"
      aria-selected={selected === option}
      onKeyDown={handleKeyDown}
      onClick={onOptionClick}
      className={classNames({ focus: selected === option })}
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
  placeholder,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const listRef = useRef();

  const onOptionChange = useCallback((newValue) => {
    onChange(newValue);
    setOpen(false);
  }, []);

  const indexSelectedOption = React.useMemo(
    () => options.findIndex((option) => option === value),
    [value, options]
  );

  const toggleOptions = () => {
    setOpen(!isOpen);
  };

  const resetSearchDebounce = useMemo(
    () =>
      debounce(() => {
        setSearchText("");
      }, 1000),
    []
  );

  const handleListKeyDown = React.useCallback(
    (e) => {
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "Enter":
          setOpen(!isOpen);
          break;
        case "ArrowUp":
          const prevOption = options?.[indexSelectedOption - 1];

          if (prevOption)
            onChange(typeof prevOption === "string" ? prevOption : prevOption);
          break;
        case "ArrowDown":
          const nextOption = options?.[indexSelectedOption + 1];
          if (nextOption) onChange(nextOption);
          break;
        default:
          break;
      }

      if (/^[A-z]$/.test(e.key)) {
        setSearchText((text) => text.concat(e.key));
      }
    },
    [indexSelectedOption, isOpen]
  );

  useEffect(() => {
    if (!searchText) return;

    const findOption = options?.find((option) => option.startsWith(searchText));

    if (findOption) onChange(findOption);

    resetSearchDebounce();
  }, [searchText, options]);

  useEffect(() => {
    if (isOpen && value) {
      updateScroll(
        listRef.current,
        document.getElementById(options[indexSelectedOption])
      );
    }
  }, [isOpen, value, options]);

  return (
    <div
      className={classNames("select-wrapper", className)}
      id={`${name}-select`}
    >
      {isOpen && (
        <div className="select-background" onClick={() => setOpen(false)}></div>
      )}
      <div className="select-container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={isOpen ? "expanded" : ""}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
          aria-label={`${placeholder} ${options[indexSelectedOption]}`}
        >
          {options[indexSelectedOption] === ALL_LABEL
            ? placeholder || ALL_LABEL
            : options[indexSelectedOption]}
        </button>
        <ul
          className={`options max-h-64 overflow-y-auto ${isOpen ? "show" : ""}`}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          aria-activedescendant={options[indexSelectedOption]}
          ref={listRef}
        >
          {options.map((option) => (
            <Option
              option={option}
              key={option}
              selected={value}
              onOptionChange={onOptionChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
