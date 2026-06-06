import dynamic from 'next/dynamic';
import { Navbar, Hero } from '@/components';

const About = dynamic(() => import('@/components').then((m) => ({ default: m.About })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
});

const Skills = dynamic(() => import('@/components').then((m) => ({ default: m.Skills })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
});

const Projects = dynamic(() => import('@/components').then((m) => ({ default: m.Projects })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
});

const Services = dynamic(() => import('@/components').then((m) => ({ default: m.Services })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
});

const Tags = dynamic(() => import('@/components').then((m) => ({ default: m.Tags })), {
  ssr: true,
  loading: () => <div className="h-32 bg-black" />,
});

const Footer = dynamic(() => import('@/components').then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
});

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Tags />
      <Footer />
    </main>
  );
}
