import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const notesDirectory = path.join(process.cwd(), 'src/content/notes');

export interface NoteData {
    slug: string;
    title: string;
    date: string;
    category: string;
    contentHtml?: string;
}

export function getSortedNotesData(): NoteData[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(notesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(notesDirectory);
    const allNotesData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(notesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the slug
        return {
            slug,
            ...(matterResult.data as { title: string; date: string; category: string }),
        };
    });

    // Sort notes by date
    return allNotesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllNoteSlugs() {
    if (!fs.existsSync(notesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(notesDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getNoteData(slug: string): Promise<NoteData> {
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
        slug,
        contentHtml,
        ...(matterResult.data as { title: string; date: string; category: string }),
    };
}
