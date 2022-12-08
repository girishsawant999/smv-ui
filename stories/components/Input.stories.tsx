import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Input } from "../../src/index";

export default {
	title: "SMV-UI/Components/Input",
	component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
    <Input {...args}/>
);

export const Basic = Template.bind({});

Basic.args = {
    placeholder: 'placeholder text',
    type: 'text',
    fullWidth: false,
};

