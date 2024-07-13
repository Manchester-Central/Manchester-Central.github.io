import Home from "../page";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'CHAOS Library',
}

export default function Library() {
  return (
    <>
      <Home/>
    </>
  );
}
