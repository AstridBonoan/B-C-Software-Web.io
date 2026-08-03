# B&C Software & Web Website - Setup Guide

## Initial Setup Instructions

After cloning this project, follow these steps to get your website fully functional:

### 1. Install Dependencies

```bash
npm install
```

### 2. Formspree (Contact Form)

The React contact form uses `@formspree/react` and is configured with form ID
`mojggrbk` in `src/components/ui/ContactFormFields.tsx`.

**Test it:**
- Run `npm run dev`
- Fill out and submit the contact form
- Check the Formspree dashboard to verify submissions are coming through

### 3. Update Social Media Links

Edit `src/components/Footer.tsx` and update the URLs:

```typescript
const socials = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/your-username',  // ← Update this
    // ...
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/your-page',       // ← Update this
    // ...
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/your-company',  // ← Update this
    // ...
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/your-handle',      // ← Update this
    // ...
  },
];
```

### 4. Customize Your Content

#### Hero Section (About)
Edit `src/components/Hero.tsx`:
- Update the main heading
- Update the description
- Modify the stats (50+, 100%, 5+)
- Change stat labels

#### Services
Edit `src/components/Services.tsx`:
- Update service titles
- Update service descriptions
- Modify feature lists
- Update pricing information

#### Footer
Edit `src/components/Footer.tsx`:
- Update company description
- Modify social media links
- Customize quick links text

### 5. Test Everything

- [ ] Run `npm run dev`
- [ ] Check both **light mode** and **dark mode** (click moon icon in navbar)
- [ ] Test the contact form - submit a test message
- [ ] Test all navigation links
- [ ] Click social media links - ensure they go to correct profiles
- [ ] Test on mobile by resizing browser
- [ ] Verify responsive menu works on mobile

### 6. Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

### 7. Deploy

Choose your hosting platform:

#### Netlify (Recommended)
1. Push code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify auto-detects Vite and configures everything
4. Deploy on every GitHub push

#### Vercel
1. Push code to GitHub
2. Import GitHub repo into Vercel
3. Vercel automatically configures for Vite
4. Deploy on every GitHub push

#### GitHub Pages
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

#### Firebase Hosting
```bash
npm run build
firebase deploy
```

#### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your web server
```

## Customization Guide

### Change Colors
Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      dark: {
        bg: "#0f172a",      // Dark mode background
        card: "#1e293b",    // Dark mode cards
        text: "#e2e8f0",    // Dark mode text
      },
      light: {
        bg: "#ffffff",      // Light mode background
        card: "#f1f5f9",    // Light mode cards
        text: "#0f172a",    // Light mode text
      },
    },
  },
}
```

### Change Fonts
Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ["YourFont", "system-ui", "sans-serif"],  // Change this
    },
  },
}
```

### Add New Sections
Create a new component in `src/components/` and import it in `App.tsx`:

```typescript
// src/components/MyNewSection.tsx
export function MyNewSection() {
  return (
    <section id="my-section" className="py-20 px-4">
      {/* Your content */}
    </section>
  );
}

// Then in App.tsx, add:
import { MyNewSection } from './components/MyNewSection'

// And in the JSX:
<MyNewSection />
```

### Update Navbar Links
Edit `src/components/Navbar.tsx` and modify the section IDs and labels in the navigation.

## Troubleshooting

### Contact Form Not Working
- [ ] Verify Form ID is correct in `ContactForm.tsx`
- [ ] Check that you've verified your email with Formspree
- [ ] Check browser console for error messages
- [ ] Test form at https://formspree.io dashboard

### Styles Broken
- [ ] Run `npm install` to reinstall dependencies
- [ ] Delete `node_modules` folder and run `npm install` again
- [ ] Restart dev server with `npm run dev`
- [ ] Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Dark Mode Not Working
- [ ] Check that browser allows localStorage
- [ ] Check browser console for JavaScript errors
- [ ] Try different browser
- [ ] Clear localStorage: See console → Application tab → Clear

### Mobile Menu Not Working
- [ ] Check browser console for errors
- [ ] Test in different browser
- [ ] Make sure window width is less than 768px (resize browser)

## Performance Tips

- Images are optimized automatically by the build process
- CSS is minified in production
- JavaScript is bundled and minified
- Tailwind CSS removes unused styles automatically
- Use `npm run build` before every deployment

## Deployment Checklist

Before deploying to production:

- [ ] Formspree form is configured and tested
- [ ] All social media links are updated
- [ ] Contact info is accurate
- [ ] Service descriptions are complete
- [ ] Pricing information is correct
- [ ] Company description is current
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] Dark mode works correctly
- [ ] All links work
- [ ] Form submissions work
- [ ] No console errors

## Support

For issues with Formspree, visit: https://help.formspree.io

For issues with Tailwind CSS, visit: https://tailwindcss.com/docs

For issues with React, visit: https://react.dev

---

**Your B&C Software & Web website is ready to launch! 🚀**
