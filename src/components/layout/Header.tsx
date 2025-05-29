import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
            <Button size="icon" variant="outline" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-xl font-semibold">{title}</h1>
        </header>
    );
}
