import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Card, Input, Typography } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}>{args.children}</Card>;

export const Main = Template.bind({});

Main.args = {
	style: {
		width: '400px'
	},
  children: (
    <>
      <Typography variant="h2" weight="bold"  style={{marginBottom: '20px'}}>
        Card Title
      </Typography>
      <hr />
      <Typography variant="p" size={14} style={{marginBlock: '20px'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quos, in voluptas soluta
        iste officia ea alias necessitatibus vitae mollitia! Fuga ea doloremque suscipit numquam
        placeat architecto sint ducimus dolorem!
      </Typography>

      <Input value="Lorem Ipsum" fullWidth style={{marginBlock: '20px'}}/>
      <Button fullWidth style={{fontSize: '14px', marginInline:'auto'}}> Test Button Card</Button>
    </>
  ),
};
