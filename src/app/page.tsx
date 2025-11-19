import TopicExplorer from '@/components/TopicExplorer';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Topic Explorer API
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A simple, fast, and interactive API to retrieve, search, and sort programming topics.
        </p>
      </header>
      <TopicExplorer />
    </main>
  );
}
