import React from "react";
import { CurrencyVM } from "../App";
import Select from "react-select";

interface Props {
  data: CurrencyVM[];
  value: CurrencyVM | undefined;
  onChange: (e: CurrencyVM) => void;
}

const CurrencySelect: React.FC<Props> = (props) => {
  const { ...rest } = props;

  const getImgName = (name: string) => {
    const head = name.slice(0, 2)?.toLocaleLowerCase();

    if (head === "st" && !["STRD", "RATOM"].includes(name)) {
      return "st" + name.substring(2);
    }

    return name;
  };

  const renderSelectLabel = (e: CurrencyVM): React.ReactElement => {
    return (
      <div className="input-label">
        <img
          className="token-img"
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${getImgName(
            e.currency
          )}.svg`}
          alt="switch"
        />

        {e.currency}
      </div>
    );
  };

  return (
    <Select
      {...rest}
      value={props.value || undefined}
      options={props.data}
      formatOptionLabel={renderSelectLabel}
      getOptionValue={(e) => e.currency}
      onChange={(e) => {
        if (e) props.onChange(e);
      }}
    />
  );
};

export default CurrencySelect;
