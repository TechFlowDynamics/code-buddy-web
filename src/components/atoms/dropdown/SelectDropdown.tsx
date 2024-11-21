import {
  CloseButton,
  Combobox,
  Divider,
  Input,
  InputBase,
  ScrollArea,
  rgba,
  useCombobox,
} from "@mantine/core";
import { v4 as uuid } from "uuid";

import React from "react";

import { useTheme } from "@/hooks/ThemeContext";

interface Props {
  data: string[];
  onChange: (value: string | null) => void;
  placeholder: string;
  label?: string;
  checkIconPosition: "left" | "right";
  value: string | null;
}

const SelectDropdown = ({
  data,
  label,
  placeholder,
  value,
  onChange,
}: Props) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const { theme } = useTheme();

  const options = data.map((item, index) => (
    <>
      <Combobox.Option
        value={item}
        key={uuid()}
        className={`dark:hover:bg-darkBgColor ${value === item && "bg-slate-400 dark:bg-darkBackground"}`}>
        {item}
      </Combobox.Option>
      {data.length !== index + 1 && <Divider />}
    </>
  ));
  return (
    <div className={`mb-4`}>
      <Combobox
        onOptionSubmit={optionValue => {
          onChange(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
        transitionProps={{ duration: 200, transition: "pop" }}
        withinPortal={false}>
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            className="my-2"
            pointer
            rightSection={
              value !== null ? (
                <CloseButton
                  size="sm"
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => onChange(null)}
                  aria-label="Clear value"
                />
              ) : (
                <Combobox.Chevron />
              )
            }
            rightSectionPointerEvents={value === null ? "none" : "all"}
            styles={{
              input: {
                backgroundColor:
                  theme === "dark" ? rgba("#374151", 1) : rgba("#f5fcff", 1),
                color:
                  theme === "dark" ? rgba("#f5fcff", 1) : rgba("#374151", 1),
                height: `40px`,
                width: "200px",
              },
            }}
            label={label}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}>
            {value || (
              <Input.Placeholder>{label || placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown className="my-1 dark:bg-gray-700">
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} type="scroll">
              {options.length === 0 ? (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              ) : (
                options
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default SelectDropdown;
