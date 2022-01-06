/* @jsx MD */
import MD, { Component } from "jsx-md";
import { Badge } from "../Badge";

/** Display a badge showing that the readme file is autogenerated with jsx-readme */
export const JsxReadmeBadge: Component = () => (
  <Badge
    link="https://dbartholomae.github.io/jsx-readme"
    imageSource="https://img.shields.io/badge/jsx--readme-lightgrey"
  >
    jsx-readme
  </Badge>
);
