import * as React from "react";

type SelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  name?: string;
  options?: string[];
  defaultValue: string;
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
      <option value={""}>{defaultValue}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
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
