import React from "react";

export interface RouterType {
  path: string;
  name: string;
  component: React.ReactNode;
  extra?: {
    [key: string]: string | number;
  }
}