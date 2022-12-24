import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flag } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Flag',
  component: Flag,
} as ComponentMeta<typeof Flag>;

const Template: ComponentStory<typeof Flag> = (args) => <Flag {...args}/>;

export const Main = Template.bind({});

Main.args = {
	countrySymbol: 'be'
};
