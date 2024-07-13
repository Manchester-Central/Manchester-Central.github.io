import { ReactElement } from "react";

export const getLibraryPath = (metadata: DocumentationMetadata, section?: DocumentationSection) => {
    return `/library/${metadata.path}${section?.title ? `#${section.title}`: ''}`;
}

export interface DocumentationMetadata {
    path: string,
    title: string,
    description: string | ReactElement;
    lastUpdated: string,
    introduction: string | ReactElement;
    sections: DocumentationSection[]
}

export interface DocumentationSection {
    title: string;
    html: ReactElement;
}

interface DocumentationProps {
    metadata: DocumentationMetadata,
}
export default function Documentation({metadata} : DocumentationProps) {
    return (
        <section>
            <div className="header">
                <h1 id="Introduction">{metadata.title}</h1>
                <small>Updated: {metadata.lastUpdated}</small>
            </div>
            <div className="subsection" key="introduction">
                <h2>Introduction</h2>
                {metadata.introduction}
            </div>
            {metadata.sections.map(section => <div className="subsection" key={section.title}>
                <h2 id={section.title}>{section.title}</h2>
                {section.html}
            </div>)}
        </section>
    );
}
