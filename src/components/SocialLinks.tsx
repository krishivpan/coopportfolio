const links = [
  {
    href: "https://github.com/krishivpan",
    label: "GitHub",
    color: "rgba(31, 81, 255, 0.5)",
    path: "M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z",
  },
  {
    href: "https://www.linkedin.com/in/krishiv-panchal/",
    label: "LinkedIn",
    color: "rgba(4, 217, 255, 0.5)",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z",
  },
  {
    href: "mailto:krishiv.panc@gmail.com",
    label: "Email",
    color: "rgba(57, 255, 20, 0.5)",
    path: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5zM4.5 5a.5.5 0 0 0-.5.5v.379l8 5.333 8-5.333V5.5a.5.5 0 0 0-.5-.5zM20 7.462l-7.445 4.963a1 1 0 0 1-1.11 0L4 7.462V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5z",
  },
];

export default function SocialLinks() {
  return (
    <div className="social-links">
      {links.map(({ href, label, color, path }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="social-link"
          style={{ background: color }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
