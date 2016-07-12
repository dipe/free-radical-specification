# Free Radical Specification

> Specification for the Free Radical Role

Yeay! You want to contribute to free-radical-specification.
That's amazing!

To smoothen everyone's experience involved with the project please
take note of the following guidelines and rules.

## Reporting issues

Thank you for reporting any issues you find.
We do our best to test and make free-radical-specification
as solid as possible, but any reported issue is a real help.

## Contributing changes

You consider contributing changes to free-radical-specification –
we dig that!

Please consider these guidelines when filing a pull request:

*   Follow the [Coding Rules](#coding-rules)

*   Follow the [Commit Rules](#commit-rules)

*   Make sure you rebased the current master branch when filing
the pull request

*   Squash your commits when filing the pull request

*   Provide a short title with a maximum of 100 characters

*   Provide a more detailed description containing

    *   What you want to achieve
    *   What you changed
    *   What you added
    *   What you removed

## Coding Rules

To keep the code base of free-radical-specification
neat and tidy the following rules apply to every change

*   Be nice
*   Be awesome

## Commit Rules

To help everyone with understanding the commit
history of free-radical-specification the following commit
rules are enforced.
To make your life easier free-radical-specification is
commitizen-friendly and provides the npm run-script `commit`.

*   [conventional-changelog](/commitizen/cz-conventional-changelog)
*   husky commit message hook available
*   present tense
*   maximum of 100 characters
*   message format of `$type($scope): $message`

## Prerequisites

In order to build `free-radical-specification`, you'll need the following
software preinstalled.

*   [node](https://nodejs.org/en/) `^5`
*   [python](https://www.python.org/) `^2.7`
*   [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

## Getting started

To modify the specification, you'll need some local tooling installed.
Follow these steps to get up and running in a breeze.

```bash
git checkout https://github.com/sinnerschrader/free-radical-specification.git
cd free-radical-specification
npm install
npm start
```

## Writing the specification

All specification sources are written in the
[bikeshed](https://github.com/tabatkins/bikeshed)
format. See the documentation there for details.

`free-radical-specification` enforces a set of conventions.
Read the [contribution guide](./contributing.md) for more
information.

## Installation troubleshooting

`free-radical-specification` depends on
[bikeshed](https://github.com/tabatkins/bikeshed),
which is a python tool assuming the presence of external libraries.

Most notably it requires `libxml2` and `libxslt`. Ensure you use the correct
versions of the libraries by installing them via your package manager.

On Mac OSX you might have to execute the following commands to do so:

```bash
brew install libxml2 libxslt
brew link libxml2 --force
brew link libxslt --force
```
