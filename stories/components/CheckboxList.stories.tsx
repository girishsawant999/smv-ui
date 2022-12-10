import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { CheckboxesList } from '../../src/index';

export default {
  title: 'SMV-UI/Components/CheckboxesList',
  component: CheckboxesList,
} as ComponentMeta<typeof CheckboxesList>;

const listData = [
  {
    name: 'Name 1',
    label: 'Label 1',
    value: '1',
  },
  {
    name: 'Name 2',
    label: 'Label 2',
    value: '2',
  },
  {
    name: 'Name 3',
    label: 'Label 3',
    value: '3',
  },
];

const Template: ComponentStory<typeof CheckboxesList> = (args) => {
  const [selectedValues, setSelectedValues] = useState<
    Array<{
      name: string;
      label: string;
      value: string;
    }>
  >([listData[1]]);

  return (
    <CheckboxesList
      listData={listData}
      {...args}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}

    />
  );
};

export const Basic = Template.bind({});

Basic.args = {
  layout: 'radio',
  listData: listData,
  selectedValues: [listData[1]],
};
