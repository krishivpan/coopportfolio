// Lassonde undergraduate competencies, as listed in the COOP 2100 ePortfolio Manual
export type Competency =
  | "Knowledge Base for Engineering"
  | "Problem Analysis"
  | "Investigation"
  | "Design"
  | "Use of Engineering Tools"
  | "Individual and Teamwork"
  | "Communication Skills"
  | "Professionalism"
  | "Impact on Society and the Environment"
  | "Ethics and Equity"
  | "Economics and Project Management"
  | "Life-Long Learning";

export interface CompetencyTag {
  competency: Competency;
  caption: string;  // why this artifact demonstrates the competency
}

export default function CompetencyTags({ tags }: { tags: CompetencyTag[] }) {
  return (
    <ul className="competency-tags">
      {tags.map(({ competency, caption }) => (
        <li key={competency} className="competency-tag">
          <span className="competency-chip">{competency}</span>
          <p className="competency-caption">{caption}</p>
        </li>
      ))}
    </ul>
  );
}
