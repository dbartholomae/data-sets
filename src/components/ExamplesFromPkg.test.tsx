/* @jsx Md */
import Md, { render } from "jsx-md";
import { ExamplesFromPkg } from "./ExamplesFromPkg";
import mockFs from "mock-fs";
import { CodeFile } from "./CodeFile";

describe("ExamplesFromPkg", () => {
  describe("with an examples directory with a json file", () => {
    const pkg = {
      name: "test-package",
      directories: {
        example: "examples",
      },
    };

    beforeEach(() => {
      mockFs({
        examples: {
          "example.json": "{}",
        },
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it("renders an 'Examples' heading", async () => {
      expect(await render(<ExamplesFromPkg pkg={pkg} />)).toContain(
        "## 🔬 Examples\n"
      );

      expect(
        await render(<ExamplesFromPkg pkg={pkg} title="Examples" />)
      ).toContain("## Examples\n");
    });

    it("renders the example.json file as an ExampleFile", async () => {
      expect(await render(<ExamplesFromPkg pkg={pkg} />)).toContain(
        await render(<CodeFile fileName="example.json">{"{}"}</CodeFile>)
      );
    });

    it("with latin1 encoding it renders the example.json file as an ExampleFile", async () => {
      expect(
        await render(<ExamplesFromPkg pkg={pkg} encoding="latin1" />)
      ).toContain(
        await render(<CodeFile fileName="example.json">{"{}"}</CodeFile>)
      );
    });

    it("replaces .. imports by imports to the package name", async () => {
      mockFs({
        examples: {
          "example.ts": 'import something from "..";',
        },
      });

      expect(
        await render(<ExamplesFromPkg pkg={{ ...pkg, name: "test-package" }} />)
      ).toContain('import something from "test-package";');
    });

    it("does not replace .. imports if replacePackageImportsWithPackageName is false", async () => {
      mockFs({
        examples: {
          "example.ts": 'import something from "..";',
        },
      });

      expect(
        await render(
          <ExamplesFromPkg
            pkg={{
              ...pkg,
              name: "test-package",
            }}
            replacePackageImportsWithPackageName={false}
          />
        )
      ).toContain('import something from "..";');
    });
  });

  describe("with an examples directory 3 files", () => {
    const pkg = {
      name: "test-package",
      directories: {
        example: "examples",
      },
    };

    beforeEach(() => {
      mockFs({
        examples: {
          "a.json": "{}",
          "c.json": "{}",
          "B.json": "{}",
        },
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it("orders the files alphabetically by lower-case", async () => {
      expect(await render(<ExamplesFromPkg pkg={pkg} />)).toMatch(
        /.*a\.json.*B\.json.*c\.json.*/s
      );
    });
  });

  it("renders nothing if directories is not defined", async () => {
    const pkg = {
      name: "test-package",
      directories: undefined,
    };
    expect(await render(<ExamplesFromPkg pkg={pkg} />)).toBe("");
  });

  it("renders nothing if example directory is not defined", async () => {
    const pkg = {
      name: "test-package",
      directories: {
        example: undefined,
      },
    };
    expect(await render(<ExamplesFromPkg pkg={pkg} />)).toBe("");
  });
});
