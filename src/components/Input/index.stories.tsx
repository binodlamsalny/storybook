import { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
    args: {
        type: "text",
        placeholder: "Enter text",
        value: "Default text",
    },
};

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Enter password",
    },
};

export const Number: Story = {
    args: {
        type: "number",
        placeholder: "Enter a number",
    },
};

export const Date: Story = {
    args: {
        type: "date",
        placeholder: "Select a date",
    },
};
