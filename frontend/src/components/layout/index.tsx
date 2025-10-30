import { User } from "../../domain/models/user.models";
import Footer from "../footer";
import Navbar from "../navbar";
import { Sidebar } from "../sidebar";

export interface LayoutProps{
  user: User;
  children: React.ReactNode;
}

function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <div className="flex flex-1 overflow-hidden">
       <Sidebar/>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
