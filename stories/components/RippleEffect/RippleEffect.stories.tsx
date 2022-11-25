import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RippleEffect } from "../../../components/RippleEffect";

export default {
  title: "Example/RippleEffect",
  component: RippleEffect 
} as ComponentMeta<typeof RippleEffect>;

const Template: ComponentStory<typeof RippleEffect> = (args) => {
  const [ , setUpdateState ] = React.useState<any>();
  const forceUpdate = React.useCallback(() => setUpdateState({}), []);
  setTimeout(() => {
    forceUpdate();
  }, 2000);

  return (true && <RippleEffect {...args} coords={ { ...args.coords } }/>);
};

export const Sample = Template.bind({});

Sample.args = {
  variant: "light",
  secondaryVariant: "white",
  coords: {
    x: 100,
    y: 100
  }
};