# nib-pattern-library

The `nib-pattern-library` can be viewed online [here](https://nib-pattern-library.firebaseapp.com/).

## Authoring

The following programs are required for authoring the `nib-pattern-library`:

- [git](https://git-scm.com/downloads) (the Github app might be easier to use if you're not familier with using a command line)
- [nodejs](https://nodejs.org/en/download/)
- xcode (for macs) - download from the app store
- An editor e.g. [Atom](https://atom.io/)
- A browser e.g. [Chrome](http://www.google.com/chrome/)

To submit changes to the `nib-pattern-library` you'll need a `Github` account and have [setup a SSH key](https://help.github.com/articles/generating-ssh-keys/).

### Installation

Enter the following commands in a `Terminal` window on `OS X` or a `Command Prompt` window on `Windows`:

2. `git clone git@github.com:nib-pattern-library/nib-pattern-library.git`
3. `cd nib-pattern-library`
99. Switch to the `Developer` wifi - <small>required internally because the proxy sucks</small>
4. `npm install`
99. Switch to the `Corp` wifi - <small>required because our packages are only accessible internally</small>
99. `npm config set registry http://npm:8080` - <small>required because our packages are only accessible internally</small>
5. `npm run build`

Open `./dist/index.html` to view the `nib-pattern-library`.

<small>
**Note**: you only ever need to perform this step once.
</small>

### Building

When you make a change to the `nib-pattern-library` you'll need to build it in order to view it:

1. `npm run build`

**Pro tip:** use `npm run watch` to automatically run the build step whenever you change a file.
**Pro tip:** use `npm run serve` and navigate to `http://localhost:5000` to view the site locally

### Publishing

When you're finished making changes to the `nib-pattern-library` and want to publish them for others to see:

1. `git add -A`
2. `git commit -am "<insert a message describing your changes here>"`
3. `git pull` - check if anyone else has made changes and merge them with your changes
4. `git push`

### Deploying

Run the following command to deploy the `nib-pattern-library` into production:

    `npm run deploy`

**Note:* You must have already installed and authenticated the firebase app `npm i -g firebase-tools && firebase login`


## Directory structure

    dist/             #all the generated files live here - any changes you make here will be lost!!!
      index.html        #the home page

    src/              #all the source files live here

      assets/           #all the style and script files live here
          index.js        #the script entry file where you should write/require your code
          index.scss      #the style entry file where you should write/require your code
          package.json    #the dependency information for your styles, scripts and tests
        test/
         index.js

      content/          #the site content
        index.ejs         #the home page
        pages/            #the content pages
          buttons.ejs
          ...

      layouts/          #the site layouts
        index.ejs
        partials/
          header.ejs
          ...

      templates/        #the site templates
        partials/
          do-list.ejs
          ...
