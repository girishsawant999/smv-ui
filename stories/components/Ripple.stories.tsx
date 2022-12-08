import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Ripple, Typography } from "../../src/index";

export default {
	title: "SMV-UI/Components/Ripple",
	component: Ripple
} as ComponentMeta<typeof Ripple>;

const Template: ComponentStory<typeof Ripple> = (args) => (
	<div style={{
        width: '200px',
        height: '200px',
        background: "#c6c6c6",
        borderRadius: '1rem',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
}}>
        <Ripple {...args}/>
        <Typography size={12}>
		    Click to check ripple effect
        </Typography>
	</div>
);

export const Basic = Template.bind({});

Basic.args = {
	overflow: false,
    rippleTime: 800
};

