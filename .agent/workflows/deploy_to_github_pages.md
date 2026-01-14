---
description: Deploy the Angular application to GitHub Pages
---

This workflow guides you through deploying the `corporate-website` Angular application to GitHub Pages.

1. **Install the GitHub Pages Deployer**
   Run the following command to add the deployment capabilities to your project:
   ```bash
   ng add angular-cli-ghpages
   ```
   *Note: If you are asked to skip installation, you can also run it via `npx` directly without adding it as a dev dependency, but adding it is recommended.*

2. **Build the Application**
   Build the project with the correct base-href for GitHub Pages.
   Replace `repository_name` with your actual repository name (e.g., `website` if your repo is `careteda-admin/website`).
   
   ```bash
   ng build --base-href "/website/"
   ```
   *If your repository is at the root (e.g. username.github.io), use `--base-href "/"`.*
   
   // turbo
3. **Deploy to GitHub Pages**
   Upload the build artifacts to the `gh-pages` branch.
   
   ```bash
   npx angular-cli-ghpages --dir=dist/corporate-website/browser
   ```
   *Note: If the above fails claiming the directory does not exist, check your `dist` folder. It might be just `dist/corporate-website` depending on your Angular version.*
   
   ```bash
   # Fallback if the browser folder doesn't exist:
   npx angular-cli-ghpages --dir=dist/corporate-website
   ```

4. **Verify Deployment**
   Go to your GitHub repository settings -> Pages, and ensure the source is set to the `gh-pages` branch. 
   Your site should be live at `https://careteda-admin.github.io/website/` (adjust for your username/repo).
