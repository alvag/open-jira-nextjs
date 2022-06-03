import { v4 as uuidv4 } from 'uuid';
import { EntryStatus } from '../interfaces';

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: EntryStatus;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En progreso Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
            status: 'in-progress',
            createdAt: Date.now() - 1000000000,
        },
        {
            description: 'Terminadas Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        }
    ]
};
