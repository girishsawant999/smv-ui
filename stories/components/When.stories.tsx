import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Card, Typography, When } from '../../src/index';

export default {
  title: 'SMV-UI/Components/When',
  component: When,
  argTypes: {
    isTrue: {
      options: [true, false],
      control: 'radio',
    }
  }
} as ComponentMeta<typeof When>;

const Template: ComponentStory<typeof When> = (args) => {

  return (
    <>

      <When {...args}>
        <Card style={{ marginBottom: '1rem', boxShadow: 'none' }}>
          <>
            <Typography variant="h2" weight="bold" style={{ marginBottom: '20px' }}>
              Card Title
            </Typography>
            <hr />
            <Typography variant="p" size={14} style={{ marginBlock: '20px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quos, in voluptas
              soluta iste officia ea alias necessitatibus vitae mollitia! Fuga ea doloremque
              suscipit numquam placeat architecto sint ducimus dolorem!
            </Typography>
            <Button style={{ fontSize: '12px' }}> Test Button Card</Button>
          </>
        </Card>
      
      </When>
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  isTrue: false
};
