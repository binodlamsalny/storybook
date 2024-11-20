import type { Meta, StoryObj } from "@storybook/react";
import { Card } from ".";
import svg from "../../../public/up-arrow-svg.svg";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        numberOfCards: {
            control: { type: "select" },
            options: [1, 2, 3, 4],
            description: "Number of cards to display.",
            defaultValue: 4,
        },
        featuredCard: {
            control: { type: "select" },
            options: [1, 2, 3, 4],
            description: "Index of the card to feature (1 to 4).",
            defaultValue: 3,
        },
        // Shared controls for all cards
        cardHeaderClassName: {
            control: "text",
            description: "CSS classes for the card header.",
            defaultValue: "bg-blue-100 text-blue-800 text-lg font-bold",
        },
        cardBodyClassName: {
            control: "text",
            description: "CSS classes for the card body.",
            defaultValue: "bg-white text-gray-700 text-sm",
        },
        cardFooterClassName: {
            control: "text",
            description: "CSS classes for the card footer.",
            defaultValue: "bg-gray-100 p-2",
        },
        featuredText: {
            control: "text",
            description: "Featured text for the featured card.",
            defaultValue: "Featured Item Lorem Ipsum",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Reusable card component render function
const renderCard = (
    index: number,
    cardData: any,
    headerClassName: string,
    bodyClassName: string,
    footerClassName: string,
    featuredCardIndex: number,
    numberOfCards: number,
) => {
    const isFeatured = index + 1 === featuredCardIndex;

    return (

        <Card key={index}
            header={
                <div
                    className={`flex items-center justify-center flex-col ${isFeatured
                        ? "bg-gradient-to-r from-[#050747] via-[#130F6B] via-0% to-[#3021B3] to-100%"
                        : "bg-[#00003A]"
                        } p-8 text-white rounded-t-3xl`}
                >
                    {isFeatured && (
                        <button className="btn mt-[-50px] bg-[#00FBCC] text-gray-800 p-2 px-4 rounded-3xl text-xs mb-4">
                            {cardData.featuredText}
                        </button>
                    )}
                    <h3 className="text-[24px] font-semibold text-[#FFFFFF]">
                        {cardData.headerContent}
                    </h3>
                    <div className="flex justify-between gap-6 text-sm mt-2 items-start">
                        <div className="flex flex-1 gap-4 items-center justify-center flex-col">
                            <p className="text-[#9999B0] font-semibold text-[16px]">
                                {cardData.pricing?.upTo10Users?.title}
                            </p>
                            <p className="text-[30px] font-bold flex items-start gap-1">
                                {cardData.pricing?.upTo10Users?.price}
                                <span className="text-xs">mo.</span>
                            </p>
                            <p className="text-xs text-[#9999B0]">
                                {cardData.pricing?.upTo10Users?.description}
                            </p>
                        </div>
                        <div className="flex flex-1 gap-4 items-center justify-center flex-col">
                            <p className="text-[#9999B0] font-semibold text-[16px]">
                                {cardData.pricing?.elevenTo100Users?.title}
                            </p>
                            <p className="text-[30px] font-bold flex items-start gap-1">
                                {cardData.pricing?.elevenTo100Users?.price}
                                <span className="text-sm">mo.</span>
                            </p>
                            <p className="text-xs text-center text-[#9999B0]">
                                {cardData.pricing?.elevenTo100Users?.description}
                            </p>
                        </div>
                    </div>
                    <p className="text-[16px] mt-10 mb-4 text-center text-[#DCDCE4] font-medium">
                        {cardData.headerInfo}
                    </p>
                </div>
            }
            body={
                <div className="px-8">
                    <p>{cardData.bodyContent}</p>
                    <ul className="list-disc pl-8 mt-4 mb-8">
                        {cardData.listItems.length ? (
                            cardData.listItems.map((item: string, index: number) => (
                                <li key={index} className="text-[16px] text-[#00003A] mb-2 font-medium">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li className="text-sm text-gray-600 mb-2">
                                No items available.
                            </li>
                        )}
                    </ul>
                    <p className="text-[16px] text-[#00003A] py-6 pr-2 font-medium">{cardData.bodyInfo}</p>
                </div>
            }
            footer={
                <div className="flex justify-between flex-col items-center mt-4 px-8">
                    <a
                        href={cardData.footerBtnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-1 w-full"
                    >
                        <button className="btn flex justify-center items-center gap-1 bg-[#4C33FF] text-white w-full py-3 rounded-md font-semibold">
                            {cardData.footerButton}{" "}
                            <img src={svg} className="h-4 w-4 rotate-[30deg]" alt="" />
                        </button>
                    </a>
                    <p className="text-[15px] text-[#00003A] p-4 text-center mt-4 leading-6 mb-4 font-sans">
                        {cardData.footerText}
                    </p>
                </div>
            }
            headerClassName={headerClassName}
            bodyClassName={bodyClassName}
            footerClassName={footerClassName}
            className={`${numberOfCards == 4 ? 'w-full' : 'max-w-[450px]'}  rounded-3xl shadow-2xl border min-h-[800px]`}
        />

    );
};

// Data structure for cards
const getCardData = (args: any, cardIndex: number) => ({
    headerContent: args[`card${cardIndex}HeaderContent`],
    bodyContent: args[`card${cardIndex}BodyContent`],
    footerButton: args[`card${cardIndex}FooterButton`],
    footerText: args[`card${cardIndex}FooterText`],
    listItems: args[`card${cardIndex}ListItems`] || [],
    pricing: args[`card${cardIndex}Pricing`],
    headerInfo: args[`card${cardIndex}HeaderInfo`],
    bodyInfo: args[`card${cardIndex}BodyInfo`],
    footerBtnLink: args[`card${cardIndex}FooterBtnLink`],
    featuredText: args.featuredText,
});
export const MultipleCards: Story = {
    args: {
        numberOfCards: 4,
        featuredCard: 3,
        featuredText: "Featured Item Lorem Ipsum",
        // Example for card 1
        card1HeaderContent: "Gliffy Diagrams for Jira",
        card1FooterButton: "Buy Now Via Atlassian",
        card1FooterText:
            "Please note that Atlassian licensing, quotes, and renewals are handled only on Atlassian Marketplace. For more information...",
        card1ListItems: [
            "Native Jira integration",
            "Intuitive drag-and-drop interface",
            "Ability to create diagrams, flowcharts, and wireframes in Jira with a single click",
            "Ability to export diagrams in multiple formats including JPEG, PNG, and SVG",
            "Ability to import Microsoft Visio *.vsdx and *.vdx diagrams",
        ],
        card1Pricing: {
            upTo10Users: {
                title: "Up to 10 Users",
                price: "$10",
                description: "Monthly flat fee",
            },
            elevenTo100Users: {
                title: "11-100 Users*",
                price: "$3.8",
                description: "Per user. Plan billed annually",
            },
        },
        card1HeaderInfo:
            "Add Giffy diagrams directly to your Jira tickets for improved communication and faster resolution of issues.",
        card1BodyInfo:
            "*Gliffy is used by teams of 20k+. Contact us for information on enterprise pricing.",
        card1FooterBtnLink: "https://www.example.com",

        // Example for card 2
        card2HeaderContent: "Gliffy Diagrams for Jira",
        card2FooterButton: "Buy Now Via Atlassian",
        card2FooterText:
            "Please note that Atlassian licensing, quotes, and renewals are handled only on Atlassian Marketplace. For more information...",
        card2ListItems: [
            "Native Jira integration",
            "Intuitive drag-and-drop interface",
            "Ability to create diagrams, flowcharts, and wireframes in Jira with a single click",
            "Ability to export diagrams in multiple formats including JPEG, PNG, and SVG",
            "Ability to import Microsoft Visio *.vsdx and *.vdx diagrams",
        ],
        card2Pricing: {
            upTo10Users: {
                title: "Up to 10 Users",
                price: "$10",
                description: "Monthly flat fee",
            },
            elevenTo100Users: {
                title: "11-100 Users*",
                price: "$3.8",
                description: "Per user. Plan billed annually",
            },
        },
        card2HeaderInfo:
            "Add Giffy diagrams directly to your Jira tickets for improved communication and faster resolution of issues.",
        card2BodyInfo:
            "*Gliffy is used by teams of 20k+. Contact us for information on enterprise pricing.",
        card2FooterBtnLink: "https://www.example.com",

        // Example for card 2
        card3HeaderContent: "Gliffy Diagrams for Jira",
        card3FooterButton: "Buy Now Via Atlassian",
        card3FooterText:
            "Please note that Atlassian licensing, quotes, and renewals are handled only on Atlassian Marketplace. For more information...",
        card3ListItems: [
            "Native Jira integration",
            "Intuitive drag-and-drop interface",
            "Ability to create diagrams, flowcharts, and wireframes in Jira with a single click",
            "Ability to export diagrams in multiple formats including JPEG, PNG, and SVG",
            "Ability to import Microsoft Visio *.vsdx and *.vdx diagrams",
        ],
        card3Pricing: {
            upTo10Users: {
                title: "Up to 10 Users",
                price: "$10",
                description: "Monthly flat fee",
            },
            elevenTo100Users: {
                title: "11-100 Users*",
                price: "$3.8",
                description: "Per user. Plan billed annually",
            },
        },
        card3HeaderInfo:
            "Add Giffy diagrams directly to your Jira tickets for improved communication and faster resolution of issues.",
        card3BodyInfo:
            "*Gliffy is used by teams of 20k+. Contact us for information on enterprise pricing.",
        card3FooterBtnLink: "https://www.example.com",

        // Example for card 2
        card4HeaderContent: "Gliffy Diagrams for Jira",
        card4FooterButton: "Buy Now Via Atlassian",
        card4FooterText:
            "Please note that Atlassian licensing, quotes, and renewals are handled only on Atlassian Marketplace. For more information...",
        card4ListItems: [
            "Native Jira integration",
            "Intuitive drag-and-drop interface",
            "Ability to create diagrams, flowcharts, and wireframes in Jira with a single click",
            "Ability to export diagrams in multiple formats including JPEG, PNG, and SVG",
            "Ability to import Microsoft Visio *.vsdx and *.vdx diagrams",
        ],
        card4Pricing: {
            upTo10Users: {
                title: "Up to 10 Users",
                price: "$10",
                description: "Monthly flat fee",
            },
            elevenTo100Users: {
                title: "11-100 Users*",
                price: "$3.8",
                description: "Per user. Plan billed annually",
            },
        },
        card4HeaderInfo:
            "Add Giffy diagrams directly to your Jira tickets for improved communication and faster resolution of issues.",
        card4BodyInfo:
            "*Gliffy is used by teams of 20k+. Contact us for information on enterprise pricing.",
        card4FooterBtnLink: "https://www.example.com",
    },
    render: (args) => {
        const numberOfCards = args.numberOfCards;
        const featuredCardIndex = args.featuredCard;

        return (
            <>
                <div className={`grid gap-9 container mx-auto`} style={{ gridTemplateColumns: `repeat(${numberOfCards}, 1fr)` }}
                >
                    {Array.from({ length: numberOfCards }, (_, index) => {
                        const cardData = getCardData(args, index + 1);
                        return renderCard(index, cardData, args.cardHeaderClassName, args.cardBodyClassName, args.cardFooterClassName, featuredCardIndex, numberOfCards);
                    })}
                </div>
            </>
        );
    },
};
