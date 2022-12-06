import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Typography } from "../../src/index";

export default {
	title: "SMV-UI/Components/Typography",
	component: Typography
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
	<Typography {...args}>{
        args.children
    }</Typography>
);

export const Basic = Template.bind({});

Basic.args = {
    children: "Typography",
};

