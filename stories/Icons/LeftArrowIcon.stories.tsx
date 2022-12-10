import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Icons } from "../../src/index";

export default {
	title: "SMV-UI/Icons/LeftArrowIcon",
	component: Icons.LeftArrowIcon
} as ComponentMeta<typeof Icons.LeftArrowIcon>;

const Template: ComponentStory<typeof Icons.LeftArrowIcon> = (args) => <Icons.LeftArrowIcon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
	stroke: "red",
	strokeWidth: 2,
	width: 40,
	height: 40
};

