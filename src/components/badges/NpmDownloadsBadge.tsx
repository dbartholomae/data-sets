/* @jsx MD */
import MD from "jsx-md";
import { Badge } from "../Badge";
import type { BadgeComponent } from "./utils/BadgeComponent";

/** Display a badge with the weekly downloads on npm of this package. */
export const NpmDownloadsBadge: BadgeComponent = ({ pkg }) => {
  if (pkg.private !== undefined && pkg.private) {
    return null;
  }
  return (
    <Badge
      link={`https://npm-stat.com/charts.html?package=${pkg.name}`}
      imageSource={`https://img.shields.io/npm/dw/${pkg.name}.svg`}
    >
      downloads
    </Badge>
  );
};
