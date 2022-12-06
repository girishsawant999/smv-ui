import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "../../../src/components/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Large.args = {
  onClick: () => console.log("Button clicked"),
  type: "button",
  className: "mt-2",
  children: "Start My Visa Process",
  variant: "dark",
  disabled: false,
  isRipple: true
};

export const Medium = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Medium.args = {
  onClick: () => console.log("Button clicked"),
  size: 1,
  type: "button",
  className: "mt-2",
  children: "Sign In",
  variant: "dark",
  disabled: false,
  isRipple: true
};