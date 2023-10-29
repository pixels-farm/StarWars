import {
  useState,
  useRef,
  ChangeEventHandler,
  forwardRef,
  useEffect,
} from "react";
import { InputBase, InputBaseProps } from "@mui/material";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import AnimatedInput, { InputDisplayState } from "./AnimatedInput";
import { faHelmetBattle } from "@fortawesome/pro-duotone-svg-icons";
import useDebounce from "../hooks/useDebounce";

export type SearchInputProps = Omit<
  Omit<InputBaseProps, "onChange">,
  "error"
> & {
  id?: string;
  delay?: number;
  value?: string | number;
  onChange: (val: string | number) => void;
  style?: object;
};

const SearchInput = forwardRef(
  ({ id, delay = 300, value = "", onChange, style }: SearchInputProps, ref) => {
    const [searchStr, setSearchStr] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedSearch = useDebounce(searchStr, delay);

    const change: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSearchStr(e.target.value);
    };

    const handleButtonClick = () => {
      setSearchStr("");
      onChange("");
    };

    useEffect(() => {
      onChange(debouncedSearch);
    }, [debouncedSearch, onChange]);

    return (
      <AnimatedInput
        keepOpened={!!searchStr.toString().trim()}
        icon={!!searchStr.toString().trim() ? faRemove : faHelmetBattle}
        onTriggerClick={handleButtonClick}
        onAnimationEnd={(status) => {
          if (status === InputDisplayState.OPENED) {
            inputRef.current?.focus();
          } else {
            inputRef.current?.blur();
          }
        }}
      >
        <InputBase
          ref={ref}
          inputRef={inputRef}
          size="small"
          onChange={change}
          value={searchStr}
          style={{
            paddingLeft: 48,
            width: "auto",
            ...style,
          }}
        />
      </AnimatedInput>
    );
  }
);

export default SearchInput;
