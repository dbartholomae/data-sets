/* @jsx MD */
import MD, { render } from "jsx-md";
import { Badge } from "../Badge";
import { CoverallsBadge } from "./CoverallsBadge";

describe("CoverallsBadge", () => {
  it("shows a coveralls badge", async () => {
    const pkg = {
      name: "package-name",
      repository: "github:dbartholomae/jsx-readme",
    };

    expect(await render(<CoverallsBadge pkg={pkg} />)).toContain(
      await render(
        <Badge
          imageSource="https://coveralls.io/repos/github/dbartholomae/jsx-readme/badge.svg"
          link="https://coveralls.io/github/dbartholomae/jsx-readme"
        >
          coveralls
        </Badge>
      )
    );
  });

  it("links correctly to a non-standard branch", async () => {
    const pkg = {
      name: "package-name",
      repository: "github:dbartholomae/jsx-readme",
    };

    expect(
      await render(<CoverallsBadge pkg={pkg} branch={"master"} />)
    ).toContain(
      await render(
        <Badge
          imageSource="https://coveralls.io/repos/github/dbartholomae/jsx-readme/badge.svg?branch=master"
          link="https://coveralls.io/github/dbartholomae/jsx-readme?branch=master"
        >
          coveralls
        </Badge>
      )
    );
  });

  it("shows nothing if there is no repository", async () => {
    const pkg = {
      name: "package-name",
    };

    expect(await render(<CoverallsBadge pkg={pkg} />)).toBe("");
  });
});
