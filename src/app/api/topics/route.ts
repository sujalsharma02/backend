import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

type Topic = {
  id: string;
  name: string;
  category: string;
};

export async function GET(request: NextRequest) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'topics.json'), 'utf8');
    let topics: Topic[] = JSON.parse(fileContents);

    const { searchParams } = request.nextUrl;
    const searchQuery = searchParams.get('search');
    const sortBy = searchParams.get('sort');

    if (sortBy && sortBy !== 'name') {
      return NextResponse.json({ error: "Invalid sort parameter. Can only sort by 'name'." }, { status: 400 });
    }

    if (searchQuery) {
      topics = topics.filter(topic => topic.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortBy === 'name') {
      topics.sort((a, b) => a.name.localeCompare(b.name));
    }

    return NextResponse.json(topics, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    // This could be a file read error or JSON parsing error.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
