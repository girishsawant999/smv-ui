import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Button, Card, Overlay, Typography } from '../../src/index';

export default {
  title: 'SMV-UI/Components/Overlay',
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return (
    <>
      <Button
        onClick={(e) => {
          setCoords({
            x: e.clientX,
            y: e.clientY,
          });
          setOpen(true);
        }}
      >
        Open Overlay
      </Button>
      <Overlay open={open} onClose={() => setOpen(false)} coords={coords} theme={args.theme}>
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
        <Card style={{ marginBottom: '1rem' }}>
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
        <Card style={{ marginBottom: '1rem' }}>
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
      </Overlay>
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
