import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import LeadCaptureForm from "./LeadCaptureForm";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <div className="mx-auto mt-2 mb-14 max-w-6xl px-4 sm:px-6">
          <LeadCaptureForm title="Get leads with SMS and WhatsApp marketing" compact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
