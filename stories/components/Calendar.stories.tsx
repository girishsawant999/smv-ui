import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Calendar } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args}>{args.children}</Calendar>
);

export const Main = Template.bind({});

Main.args = {
  onChange: (date) => console.log('date', date),
  disableDates: [new Date('2012-12-12'), new Date('1997-11-16')],
};
