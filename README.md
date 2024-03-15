# Upgraded Markdown to HTML/ANSI Converter

This application converts Markdown files into HTML or ANSI format. It uses Node.js to read Markdown files and generates
the corresponding HTML or ANSI, which can then be written to a file or outputted to the console.

## Installation

Ensure that you have [Node.js](https://nodejs.org/) installed for proper functioning.

Clone the repository and install dependencies:
```bash
git clone https://github.com/KobbAsa/mlab2
cd mlab2
npm install
```

## Application Usage
To convert a Markdown file to HTML and specify an output file, use the following command:

```bash
 node node src/main.js input.md --out output.html --format=html
```

or

```bash
 node node src/main.js input.md --out output.html
```

To convert a Markdown file to ANSI and specify an output file, use the following command:

```bash
 node node src/main.js input.md --out output.txt --format=ansi
```

Here **input.md** is the path to your Markdown file, and **output.html** or **output.txt** is the path where you wish to save the HTML or ANSI file.

If you do not specify an output file, the ANSI will be outputted to the console.

```bash
node node src/main.js input.md
```

## Tests Usage

Just go to tests directory and run whatever test you want.

For example:
```bash
cd test
node .\tests\ansiConverterTests.js    
```

The results of tests will be shown in console with marks and explanation.

# User Instructions
* The input file must be in Markdown format.
* Ensure that all Markdown markers are correctly opened and closed.
* In case of detection of unclosed markers or nesting errors, the program will throw an error and halt the conversion.

Revert commit [here](https://github.com/KobbAsa/mlab2/commit/37b72be212b1b0338ff04cca2f26695eefe3fd0d).

Failed CI tests [here](https://github.com/KobbAsa/mlab2/commit/f1d45f9186a5b958a6756159bec60a289f5edbcb)

# Summary
To be honest, I wrote such tests for the first time, so I can't compare with anything from my experience.
The tests themselves are written "on snot" and are very simple (like the converter itself tbf).
However, even these tests are very useful for pushes and pr`s, in order to be sure and test every function in project and 
every other case automatically, instead of doing it manually through command prompt before commit.
