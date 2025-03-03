# My Blockchain Portfolio

Welcome to **Hemant's Blockchain Portfolio**, a modern, responsive website showcasing my work as a full-stack blockchain developer and smart contract specialist. This repository contains the source code for a sleek portfolio website built with React, Next.js, and Tailwind CSS, featuring smooth animations, interactive project cards, and a dynamic contact form.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This portfolio website is designed to highlight my skills, projects, and expertise in blockchain development. It includes several sections:

- **Home:** An animated hero section with a particle background.
- **About:** A brief introduction about my experience and background.
- **Projects:** A categorized list of projects (DeFi, NFTs, Infrastructure, etc.) presented in interactive cards.
- **Skills:** Visual progress bars that showcase my technical skills and blockchain expertise.
- **Contact:** A contact form with form validation for visitors to send me a message.

## Features

- **Animated Particle Background:** Uses HTML5 Canvas for an interactive visual effect.
- **Smooth Navigation:** Fixed header with smooth scrolling and an intersection observer to highlight the active section.
- **Responsive Design:** Fully responsive layout optimized for both desktop and mobile devices.
- **Interactive Project Cards:** Cards showcasing individual projects with live demo and GitHub links.
- **Contact Form:** A robust contact form built with react-hook-form and Zod for validation.
- **Motion Animations:** Seamless animations provided by Framer Motion for a polished user experience.

## Technology Stack

- **Frontend Framework:** React with Next.js (Client-side rendering enabled using `"use client"`)
- **Styling:** Tailwind CSS with utility classes for rapid UI development
- **Animations:** Framer Motion for smooth transitions and interactive effects
- **Form Validation:** react-hook-form and Zod for robust, schema-based form validation
- **Icons:** lucide-react for a consistent iconography

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hemant-exe/my-portfolio.git
   cd frontend

   ```

2. **Install dependencies:**

   ```bash
   npm install # or
   yarn install

   ```

3. **Run the development server:**

   ```bash
   npm run dev #or
   yarn dev

   ```

4. **Open your browser:**
   Visit http://localhost:3000 to see the portfolio website in action.

## Usage

The application is divided into multiple sections:

- **Hero Section:** Showcases an animated introduction and links to navigate to projects or contact.
- **About Section:** Contains personal details and a short bio.
- **Projects Section:** Lists your projects categorized by type (e.g., DeFi, NFT, Infrastructure).
- **Skills Section:** Displays a graphical representation of your technical and blockchain skills.
- **Contact Section:** A working contact form that validates input and simulates sending a message.

## Project Structure

```php
my-portfolio/
├── components/
│   ├── ui/                  # Reusable UI components (Button, Card, Input, etc.)
│   └── ProjectCard.tsx      # Component for displaying individual project cards
├── pages/
│   └── index.tsx            # Main portfolio page (contains the complete layout)
├── public/
│   └── images/              # Static assets and images (e.g., profile picture, placeholders)
├── styles/                  # Global and component-specific styles (Tailwind config, CSS files)
├── protfoio.tsx             # typscript code for protfolio webpage
├── package.json             # Project configuration and dependencies
└── README.md                # Project documentation (this file)
```

## Contributing

Contributions are welcome! If you have ideas, suggestions, or improvements:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Commit your changes.
4.  Push to your branch and open a pull request.

Please ensure your code follows the established coding conventions and is well-tested.

## License

This project is licensed under the [See The License](LICENSE).

## Contact

If you have any questions or want to connect, feel free to reach out:

- **Email:** hemant17052002@gmail.com
- **GitHub:** [Hemant-exe](https://github.com/Hemant-exe)
- **LinkedIn:** [Hemant Rajpurohit](https://www.linkedin.com/in/hemant-rajpurohit/)
