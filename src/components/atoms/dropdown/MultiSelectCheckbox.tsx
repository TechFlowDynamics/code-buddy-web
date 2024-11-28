"use client";

import {
  Checkbox,
  Combobox,
  Divider,
  Group,
  Input,
  Pill,
  PillsInput,
  ScrollArea,
  rgba,
  useCombobox,
} from "@mantine/core";
import { v4 as uuid } from "uuid";

import React, { useEffect, useState } from "react";

import { useTheme } from "@/hooks/ThemeContext";

interface Props {
  data: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  comboxClassName?: string;
  label?: string;
  checkIconPosition: "left" | "right";
  value: string[];
}

const MultiSelectCheckbox = ({
  data,
  label,
  placeholder,
  comboxClassName,
  value,
  onChange,
}: Props) => {
  const [valueChange, setValueChange] = useState<string[]>([]);
  const { theme } = useTheme();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueSelect = (val: string) => {
    setValueChange(current =>
      current.includes(val)
        ? current.filter(v => v !== val)
        : [...current, val],
    );
  };

  const handleValueRemove = (val: string) =>
    setValueChange(current => current.filter(v => v !== val));

  const values = valueChange.map(item => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  useEffect(() => {
    onChange(valueChange);
  }, [valueChange]);

  const options = data.map((item, index) => (
    <div key={uuid()}>
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
        className={`dark:hover:bg-darkBgColor ${value.includes(item) && "bg-slate-400 dark:bg-darkBackground"}`}>
        <Group gap="sm">
          <Checkbox
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
      {data.length !== index + 1 && <Divider />}
    </div>
  ));
  return (
    <div className={`mb-4 ${comboxClassName}`}>
      <Combobox
        onOptionSubmit={handleValueSelect}
        store={combobox}
        transitionProps={{ duration: 200, transition: "pop" }}
        withinPortal={false}>
        <Combobox.Target>
          <PillsInput
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
            pointer
            onClick={() => combobox.toggleDropdown()}>
            <Pill.Group>
              {values.length > 0 ? (
                values
              ) : (
                <Input.Placeholder>{label || placeholder}</Input.Placeholder>
              )}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  type="hidden"
                  onBlur={() => combobox.closeDropdown()}
                  onKeyDown={event => {
                    if (event.key === "Backspace") {
                      event.preventDefault();
                      handleValueRemove(valueChange[valueChange.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>

        <Combobox.Dropdown className="my-1 dark:bg-gray-700">
          <Combobox.Options key={uuid()}>
            <ScrollArea.Autosize mah={200} type="scroll" key={uuid()}>
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

export default MultiSelectCheckbox;
