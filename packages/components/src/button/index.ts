
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonType = "primary" | "secondary";

export interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
}

export const getButtonSize = function (size?: ButtonSize) {
  switch (size) {
    case "md":
      return 36;
    case "lg":
      return 42;
    default:
      return 28;
  }
};