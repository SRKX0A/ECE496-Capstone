import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IUser{
    id: number,
    emailAddress: string,
    name: string,
}

export type OptionType = {
    label: string;
    value?: string;
    i1? : number;
    i2?: number;
    s1?: string;
    s2?: string;
};

export type WizardOption = {
    label: string;
    icon: IconProp;
};

export type TimeStamp = {
    word: string;
    confidence: number;
    startTime: number;
    endTime: number;
    duration: number;
}