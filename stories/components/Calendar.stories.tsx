import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Calendar } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args}>{args.children}</Calendar>;

export const Main = Template.bind({});

Main.args = {
    value: '2021-12-12',
    onChange: (date) => console.log('date', date)
};
