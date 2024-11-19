import { cn } from "@/utils";
import {
    PolymorphicComponentPropsWithRef,
    PolymorphicRef,
} from "@/utils/types";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

// Define the card styles with variants
const cardStyles = cva("rounded shadow", {
    variants: {
        padding: {
            sm: "",
            base: "",
            lg: "",
        },
        shadow: {
            none: "shadow-none",
            sm: "shadow-sm",
            base: "shadow-md",
            lg: "shadow-lg",
        },
    },
    defaultVariants: {
        padding: "base",
        shadow: "base",
    },
});

// Define the types for the Card component
type CardProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
    C,
    VariantProps<typeof cardStyles> & {
        header?: React.ReactNode;
        body?: React.ReactNode;
        footer?: React.ReactNode;
        headerClassName?: string;
        bodyClassName?: string;
        footerClassName?: string;
    }
>;

type CardComponent = <C extends React.ElementType = "div">(
    props: CardProps<C>
) => React.ReactElement | null;

// Define the Card component
//@ts-expect-error - unexpected typing error
export const Card: CardComponent = forwardRef(
    <C extends React.ElementType>(
        {
            as,
            padding,
            shadow,
            header,
            body,
            footer,
            headerClassName,
            bodyClassName,
            footerClassName,
            className,
            ...props
        }: CardProps<C>,
        ref?: PolymorphicRef<C>
    ) => {
        const Component = as || "div";
        return (
            <Component
                ref={ref}
                className={cn(cardStyles({ padding, shadow }), className)}
                {...props}
            >
                {header && (
                    <div className={cn("mb-4", headerClassName)}>{header}</div>
                )}
                {body && (
                    <div className={cn("flex-1", bodyClassName)}>{body}</div>
                )}
                {footer && (
                    <div className={cn("mt-4", footerClassName)}>{footer}</div>
                )}
            </Component>
        );
    }
);
