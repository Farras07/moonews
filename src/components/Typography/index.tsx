import * as React from "react";
import styles from "./_.module.css";

export type TypographyVariant =
  | "c1"
  | "c2"
  | "btn"
  | "bt"
  | "p"
  | "t"
  | "h6"
  | "h5"
  | "h4"
  | "h3"
  | "h2"
  | "h1";

export type TypographyColor =
  | "white"
  | "surface"
  | "outline"
  | "inline"
  | "disabled"
  | "icon"
  | "input"
  | "dark"
  | "darkgray"
  | "gray";

export type FontVariant = "jakarta" | "roboto";

export type FontWeight = "regular" | "medium" | "semibold" | "bold";

export interface TypographyProps<T extends React.ElementType> {
  as?: T;
  weight?: FontWeight;
  color?: TypographyColor;
  font?: FontVariant;
  variant?: TypographyVariant;
  children?: React.ReactNode;
  className?: string;
}

export default function Typography<T extends React.ElementType = "p">({
  as,
  children,
  weight = "regular",
  className = "",
  color = "white",
  font = "jakarta",
  variant = "p",
  ...props
}: TypographyProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || "p";

  const combinedClassName = [
    styles.typography || "",
    styles[`font-${font}`] || "",
    styles[`weight-${weight}`] || "",
    styles[`variant-${variant}`] || "",
    styles[`color-${color}`] || "",
    className
  ].filter(Boolean).join(" ");

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
