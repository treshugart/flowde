# Flowde

Run JavaScript written in Flow through Node.

- Type checks your code before executing it.
- Will automatically create an empty, temporary `.flowconfig` file if one doesn't exist and cleans up after itself.
- Uses Babel presets `env` and `stage-0` so you can use anything you want.

## Why?

Many times you don't want to set up a build process simply to run scripts in node, but you do want to reap the benefits of static typing. In this case, static typing can catch many bugs that would otherwise go unnoticed and since you're probably not writing tests for your scripts, it can be immensely helpful in being productve.

## Getting started

Flode works both locally and globally, as long as you have your CWD in your PATH.

```
npm install flowde
```

Usage is the same as with `node`:

```bash
flowde path/to/my/script.js
```

*There are currently no options.*

## Notes

- Remember to add `// @flow` to the files you want checked.
