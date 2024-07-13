import { AllDocuments } from './library/all-documents';
import { Button, Card } from "flowbite-react";
import { getLibraryPath } from './library/documentation';
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'CHAOS Library',
}

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1><a href="/" className="logo"><strong>The Library</strong> by 131 Chaos</a></h1>
      </header>

      <section>
        <p>The library is a repository of information and techniques that are used in robotics, explained in a step by step &quot;lesson plan&quot; style.</p>

        <div style={{display: 'flex', flexDirection: 'row', gap: 40, marginTop: 50}}>
          {AllDocuments.map(doc => <Card className="max-w-sm" key={doc.path}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-80">
              {doc.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {doc.description}
            </p>
            <Button href={getLibraryPath(doc)}>
              Read more
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>)}
        </div>
      </section>
    </main>
  );
}
