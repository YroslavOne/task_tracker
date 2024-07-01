import { InputHTMLAttributes } from "react";

export interface InputForSettingsProps extends InputHTMLAttributes<HTMLInputElement>{
title: string;
isValid: boolean;
}