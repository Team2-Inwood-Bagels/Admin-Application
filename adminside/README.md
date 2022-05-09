To run this app:
you need to be in the /client folder
# Install dependencies
npm install
# To run the app
npm start
# To build the app
npm build
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

Commit Messages - IMPORTANT!
The commit message should be structured as follows

###<type>[optional scope]: <description> Example:

feat(lang): added French language
fix(server): fixed 404 error in /GET requests
###fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning). ###feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).

Branching - IMPORTANT!
We never work on the main branch. If you are working on the feature/bug/etc., you need to create a local branch first, preferably in the following format:

<your name>/<work scope>

For example: masha/orderBackend

When you finish your work, you should open a Pull Request and wait for a reviewer to approve the changes. We never push to the main branch. We never merge the PR without it to be reviewed AND approved.
