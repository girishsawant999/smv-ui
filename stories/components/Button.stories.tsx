import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BackButton, Button, CrossButton } from "../../src/index";

export default {
	title: "SMV-UI/Components/Button",
	component: Button
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>{args.children}</Button>
);

const BackButtonTemplate: ComponentStory<typeof BackButton> = (args) => (
	<BackButton {...args}/>
);

const CrossButtonTemplate: ComponentStory<typeof CrossButton> = (args) => (
	<CrossButton {...args}/>
);


export const Basic = BasicTemplate.bind({});
export const Back_Button = BackButtonTemplate.bind({})
export const Cross_Button = CrossButtonTemplate.bind({})

Basic.args = {
	children: 'Button',
	variant: 'primary',
	size: 'rg',
};

