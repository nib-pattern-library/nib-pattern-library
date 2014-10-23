# nib-pattern-library

This is the pattern library for the web at nib.

## Prerequisites

Required software:

- [git](http://git-scm.com/download)
- [nodejs](http://nodejs.org/download/)
- An editor
- A browser

## Installation

1. Open a command prompt
1. Clone from Github - `git clone https://github.com/nib-pattern-library/nib-pattern-library.git`
1. Change the current directory - `cd nib-pattern-library`
1. Install node modules - `npm install`
1. Authorise component to access the Github API by creating a [token](https://github.com/settings/tokens/new) and adding it to your `~/.netrc` file.


    machine api.github.com
      login <github-username>
      password <github-token>

## Building

1. Run `npm run build` 
1. Open `build/index.html`

## Editing

1. Get the latest code `git pull`
1. Run `npm run watch` 
1. Open `build/index.html`
1. Edit content in the `content` directory, templates in the `templates` directory or JavaScript and styles in the `components` directory.
1. Refresh the page
1. Commit your changes `git add -A && git commit -am "msg describing changes"`
1. Share your changes `git push`

The templating language used is [EJS](https://github.com/tj/ejs).