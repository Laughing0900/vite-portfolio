/* eslint-disable @next/next/no-img-element */
"use client";

import { Cloud, ICloud } from "react-icon-cloud";

export type DynamicCloudProps = {
    iconSlugs?: string[]; // Made iconSlugs optional
    imageArray?: string[];
};

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // width: "100%",
            // paddingTop: 40,
        },
    },
    options: {
        // reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        // tooltip: "native",
        initial: [0.075, -0.05],
        clickToFront: 250,
        tooltipDelay: 0,
        outlineColour: "#ff007a",
        outlineRadius: 500,
        outlineOffset: 25,
        maxSpeed: 0.02,
        minSpeed: 0.01,
        dragControl: true,
    },
};

export function IconCloud({ imageArray }: DynamicCloudProps) {
    return (
        <Cloud {...cloudProps}>
            <>
                {imageArray &&
                    imageArray.length > 0 &&
                    imageArray.map((image, index) => {
                        return (
                            <a
                                key={index}
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                <img
                                    height="42"
                                    width="42"
                                    alt="A globe"
                                    src={image}
                                />
                            </a>
                        );
                    })}
            </>
            <div></div>
            <div></div>
        </Cloud>
    );
}
