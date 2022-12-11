import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DatePicker } from "../../src/index";

export default {
	title: "SMV-UI/Components/DatePicker",
	component: DatePicker
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
    <DatePicker {...args}/>
);

export const Basic = Template.bind({});

Basic.args = {
    fullWidth: false,
};

