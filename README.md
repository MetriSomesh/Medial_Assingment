# Assignment
## Overview
This document outlines a system for creating a functional post page that dynamically generates appropriate Open Graph (OG) images. The system leverages React, Tailwind CSS, and html2canvas to provide a user-friendly interface for post creation and preview.


## How it Works
### 1. Post Creation
- Users input post title, content, and optionally upload an image.
- Clicking "Create Post" generates a unique post link.


### 2. OG Image Generation
- The OGImageGenerator component constructs a hidden div mirroring the desired OG image layout.
- html2canvas converts this div into an image.
- The generated image URL is set as the og:image meta tag.

### 3. Post Preview
- A preview displays how the post will appear on social media.
- Includes title, content snippet, uploaded image (if any), and generated post link.

