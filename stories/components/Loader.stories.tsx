import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loader } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Loader',
  component: Loader,
  argTypes: {
    loader: {
      options: [
        'spinner',
        'circle-notch',
        'three-dots',
        'ball-triangle',
        'bars',
        'filling-box',
        'puff',
        'half-circles',
        'circular-stripes',
      ],
      control: { type: 'radio' },
      
    },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => {
  return <Loader  {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
    loader :'circle-notch',
    style: {
        fontSize: '60px',
    }
};
