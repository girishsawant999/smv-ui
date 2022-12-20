import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Logo } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Main = Template.bind({});

Main.args = {
};
