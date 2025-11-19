'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Search, ArrowDownUp, FileJson, AlertCircle, BookOpen } from 'lucide-react';

type Topic = {
  id: string;
  name: string;
  category: string;
};

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-muted rounded-md p-4 overflow-x-auto">
      <code className="font-code text-sm text-muted-foreground">{children}</code>
    </pre>
  );
}

export default function TopicExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByName, setSortByName] = useState(false);
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('/api/topics');

  const fetchTopics = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (sortByName) params.append('sort', 'name');
      const url = `/api/topics?${params.toString()}`;
      setApiUrl(url);

      const res = await fetch(url);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTopics(data);
    } catch (e: any) {
      setError(e.message);
      setTopics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
           <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                API Documentation
              </CardTitle>
              <CardDescription>How to use the Topic Explorer API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Endpoint</h3>
                <CodeBlock>GET {apiUrl}</CodeBlock>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Query Parameters</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-code font-semibold text-foreground">search</span> (optional, string): Filter topics by name (case-insensitive).</li>
                    <li><span className="font-code font-semibold text-foreground">sort</span> (optional, string): Use <span className='font-code'>'name'</span> to sort topics alphabetically.</li>
                </ul>
              </div>
               <div>
                <h3 className="font-semibold mb-2">Example `curl`</h3>
                <CodeBlock>{`curl "http://localhost:9002${apiUrl}"`}</CodeBlock>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-8">
          <Card>
            <form onSubmit={fetchTopics}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-6 h-6" />
                  Live Demo
                </CardTitle>
                <CardDescription>
                  Use the controls below to fetch data from the API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search topics (e.g., 'React')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sort-by-name"
                    checked={sortByName}
                    onCheckedChange={setSortByName}
                  />
                  <Label htmlFor="sort-by-name" className="flex items-center gap-2">
                    <ArrowDownUp className="h-4 w-4" /> Sort by Name
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Fetching...' : 'Fetch Topics'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="w-6 h-6" />
                API Response
              </CardTitle>
              <CardDescription>
                JSON result from <span className="font-code">{apiUrl}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[220px]" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <CodeBlock>
                  {topics ? JSON.stringify(topics, null, 2) : 'No topics found.'}
                </CodeBlock>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
