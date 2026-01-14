---
description: Configure a custom domain for your GitHub Pages site
---

This workflow guides you through configuring a custom domain for your Angular application on GitHub Pages.

1. **Configure DNS Records**
   Go to your domain provider's DNS settings (e.g., GoDaddy, Namecheap, Google Domains) and add the following records:

   - **For a root domain (e.g., `careteda.com`):**
     Add **A records** pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

   - **For a subdomain (e.g., `www.careteda.com`):**
     Add a **CNAME record** pointing to your GitHub Pages URL:
     - Host: `www`
     - Value: `careteda-admin.github.io` (do not include the `/website/` part)

2. **Configure GitHub Repository**
   1. Go to your GitHub repository -> **Settings** -> **Pages**.
   2. Under **Custom domain**, enter your domain (e.g., `careteda.com` or `www.careteda.com`).
   3. Click **Save**.
   4. (Optional but recommended) Check **Enforce HTTPS**.

3. **Update Angular Project**
   To ensure the custom domain persists after future deployments, you must add a `CNAME` file to your source code.

   1. Create a file named `CNAME` in your `src/` folder.
   2. Inside `src/CNAME`, add *only* your domain name (e.g., `careteda.com`) with no protocol (http/https) and no trailing slashes.
   3. Update `angular.json` to include the `CNAME` file in the assets array:
      ```json
      "assets": [
        "src/favicon.ico",
        "src/assets",
        "src/CNAME"  <-- Add this line
      ]
      ```

4. **Re-deploy**
   Build and deploy again. **Important**: When using a custom domain, your `base-href` should usually be `/` instead of `/repository-name/`.
   
   ```bash
   ng build --base-href "/"
   npx angular-cli-ghpages --dir=dist/corporate-website/browser --cname=careteda.com
   ```
   *(Replace `careteda.com` with your actual domain)*
