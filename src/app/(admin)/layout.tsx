import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 bg-slate-50 dark:bg-slate-950">
                {children}
            </main>
        </div>
    );
}
