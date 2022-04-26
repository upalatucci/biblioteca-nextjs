import * as React from "react";

type OptionType = string | { value: string; label: string };

type SelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  name?: string;
  options?: OptionType[];
  defaultValue?: string;
};

type OptionPtops = {
  option: OptionType;
};

const Option: React.FC<OptionPtops> = ({ option }) => {
  if (typeof option === "string") {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  } else {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  }
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  name,
  options,
  defaultValue,
}) => {
  //   const [isOpen, setOpen] = React.useState(false);

  //   const onOptionChange = (option) => {
  //     onChange(option);
  //     setOpen(false);
  //   };

  return (
    <select
      value={value || defaultValue}
      onChange={(e) => onChange(e.target.value)}
      name={name}
    >
      {defaultValue && <Option option={{ value: "", label: defaultValue }} />}
      {options.map((option) => (
        <Option
          key={typeof option === "string" ? option : option?.value}
          option={option}
        />
      ))}
    </select>
  );

  //   return (
  //     <div
  //       className={"primary-select open-" + isOpen}
  //       onClick={() => setOpen(true)}
  //     >
  //       <select value={value} name={name}></select>
  //       {value || defaultValue}

  //       {isOpen && (
  //         <div className="options">
  //           <ul>
  //             {options.map((option) => (
  //               <li key={option} onClick={() => onOptionChange(option)}>
  //                 {option}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default Select;
