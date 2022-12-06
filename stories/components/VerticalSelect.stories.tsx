import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { VerticalSelect } from '../../src/index';

export default {
  title: 'SMV-UI/Components/VerticalSelect',
  component: VerticalSelect,
} as ComponentMeta<typeof VerticalSelect>;

const options = [
  {
    label: 'Label 1',
    value: 'value 1',
    icon: "https://flagcdn.com/za.svg"
  },
  {
    label: 'Label 2',
    value: 'value 2',
  },
  {
    label: 'Label 3',
    value: 'value 3',
  },
  {
    label: 'Label 4',
    value: 'value 4',
  },
];

const Template: ComponentStory<typeof VerticalSelect> = (args) => {
  const [value, setValue] = useState('');
  return (
    <VerticalSelect
      options={args.options}
      value={value}
      setValue={setValue}
      label={args.label}
      name={args.name}
      showSearch={args.showSearch}
      placeholder={args.placeholder}
      defaultOpen={args.defaultOpen}
      disabled={args.disabled}
    />
  );
};

export const Basic = Template.bind({});

Basic.args = {
  options: options,
  label: 'Basic vertical select',
  name: 'basic-vertical-select',
  showSearch: false,
  placeholder: 'Enter search term',
  defaultOpen: false,
  disabled: false,
};
