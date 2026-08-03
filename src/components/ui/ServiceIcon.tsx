interface ServiceIconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className = 'h-6 w-6' }: ServiceIconProps) {
  const props = { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': true as const };

  switch (name) {
    case 'globe':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.5 3.4 5.6 3.4 9s-1.2 6.5-3.4 9M12 3c-2.2 2.5-3.4 5.6-3.4 9s1.2 6.5 3.4 9" />
        </svg>
      );
    case 'bot':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 3h6M12 3v2M7 10h10M8 21h8M6 10v5a6 6 0 0012 0v-5" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3l9 5-9 5-9-5 9-5zm0 8l9 5-9 5-9-5 9-5z" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" />
        </svg>
      );
    case 'smartphone':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zm4 14h.01" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 3v2m8-2v2M5 9h14M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 00-14.9-3M4 16a8 8 0 0014.9 3" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6v12m6-6H6" />
        </svg>
      );
  }
}

export function IndustryIcon({ name, className = 'h-5 w-5' }: ServiceIconProps) {
  const props = { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': true as const };

  switch (name) {
    case 'utensils':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 4v6m0 0v10M6 10h2m-2 0H4m14-6v6m0 0v10m0-10h2m-2 0h-2" />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.1 2.1-3.3-3.3 2.1-2.1z" />
        </svg>
      );
    case 'scissors':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 4a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4zM7 20a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4zM9 8l6 8M15 8l-6 8" />
        </svg>
      );
    case 'hammer':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 4l6 6-4 4-3-3-7 7-3-3 7-7-3-3 4-4z" />
        </svg>
      );
    case 'dumbbell':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 10h2v4H4v-4zm14 0h2v4h-2v-4zM8 12h8" />
        </svg>
      );
    case 'store':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 10h16M6 10V7l2-3h8l2 3v3M6 20v-6h12v6" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-9 4h10M6 11v8a2 2 0 002 2h8a2 2 0 002-2v-8" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 11c1.7 0 3-1.3 3-3S13.7 5 12 5 9 6.3 9 8s1.3 3 3 3zm0 0c-4 0-7 2-7 5v2h14v-2c0-3-3-5-7-5z" />
        </svg>
      );
  }
}
