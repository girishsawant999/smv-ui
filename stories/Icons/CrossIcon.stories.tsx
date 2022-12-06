import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Icons } from "../../src/index";

export default {
	title: "SMV-UI/Icons/CrossIcon",
	component: Icons.CrossIcon
} as ComponentMeta<typeof Icons.CrossIcon>;

const Template: ComponentStory<typeof Icons.CrossIcon> = (args) => <Icons.CrossIcon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
	stroke: "green",
	strokeWidth: 2,
	width: 40,
	height: 40
};

