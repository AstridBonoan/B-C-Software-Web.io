# B&C Software & Web - Professional Business Website

A modern, professional mobile-first website for B&C Software & Web built with React, Tailwind CSS, and Vite.

## 🌟 Features

- **Clean, Professional Design** - Dark and light mode support with smooth transitions
- **Responsive** - Mobile-first design that works on all devices
- **Fast** - Built with Vite for instant dev server and optimized production builds
- **Sections** - About/Intro, Services Showcase, Pricing, Contact Form, Footer
- **Form Integration** - Formspree-powered contact form for email submissions
- **Dark Mode Toggle** - User preference saved to localStorage

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS 3
- Formspree (form submissions)

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Formspree

The React contact form uses `@formspree/react` and is configured with form ID
`mojggrbk` in `src/components/ui/ContactFormFields.tsx`.

### Customize Content

**Services** - Edit `src/components/Services.tsx`:
- Change service titles and descriptions
- Update features lists
- Modify pricing text

**About Section** - Edit `src/components/Hero.tsx`:
- Update hero copy
- Change stats numbers
- Update CTA text

**Footer** - Edit `src/components/Footer.tsx`:
- Update company description
- Customize quick links

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        - Navigation & theme toggle
│   ├── Hero.tsx          - About/hero section
│   ├── Services.tsx      - Service offerings
│   ├── ContactForm.tsx   - Contact form with Formspree
│   └── Footer.tsx        - Footer with quick links
├── hooks/
│   └── useTheme.ts       - Dark/light mode logic
├── App.tsx               - Main app component
├── index.css             - Tailwind CSS
└── main.tsx              - React entry point
```

## 📦 Deployment

The website can be deployed to any static hosting platform:

**Netlify** - Connect GitHub repo, auto-configured for Vite
**Vercel** - Import GitHub repo, auto-detects Vite
**GitHub Pages** - Use `npm run build` output
**Firebase Hosting** - Deploy `dist/` folder
**AWS S3 + CloudFront** - Deploy `dist/` folder

## 🎨 Styling

The entire site is styled with Tailwind CSS. To customize:

**Colors** - Edit `tailwind.config.js`
**Fonts** - Edit `tailwind.config.js` (extends > fontFamily)
**Spacing** - Modify Tailwind classes in component files

No custom CSS needed - everything uses Tailwind utility classes!

## ✅ Before Going Live

- [ ] Set up Formspree form and update ContactForm.tsx
- [ ] Update company description and hero copy
- [ ] Update service descriptions and pricing
- [ ] Test form submissions
- [ ] Test dark/light mode toggle
- [ ] Test on mobile devices
- [ ] Deploy to production

## 🔧 Available Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ❓ Help

**Contact form not working?**
- Verify your Form ID is correct in ContactForm.tsx
- Check that you've confirmed your email with Formspree
- Test in the Formspree dashboard

**Styles not applying?**
- Ensure Tailwind CSS is installed: `npm install`
- Restart the dev server
- Clear browser cache

**Dark mode not working?**
- Ensure localStorage is enabled in your browser
- Check browser console for errors

## 📄 License

Proprietary to B&C Software & Web.

---

**Ready to launch! 🚀**
