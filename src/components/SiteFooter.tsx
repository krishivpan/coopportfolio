const EMAIL = "krishivp@my.yorku.ca";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>Krishiv Panchal</span>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <span>Last updated {__LAST_UPDATED__}</span>
    </footer>
  );
}
