import Navbar from "@/components/store/Navbar";
import TopNavbar from "@/components/store/TopNavbar";
import Footer from "@/components/store/Footer";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNavbar />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
