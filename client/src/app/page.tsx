"use client";

import CommissionTable from "./components/comission";
import Footer from "./components/footer";
import MarketingTeam from "./components/marketing";
import Navbar from "./components/navbar";
import PaymentsTable from "./components/pembayaran";
import SalesTable from "./components/penjualan";
import { useState, useEffect } from "react";

const Home = () => {
  const [activeSection, setActiveSection] = useState<string>("marketing");

  // Handle scroll to section
  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Detect the section that is currently in view
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px", // Trigger when 50% of the section is in view
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar onSelectSection={handleSelectSection} activeSection={activeSection} />
      <section id="marketing" className="my-8">
        <MarketingTeam />
      </section>
      <section id="penjualan" className="my-8">
        <SalesTable />
      </section>
      <section id="commission" className="my-8">
        <CommissionTable />
      </section>
      <section id="payment" className="my-8">
        <PaymentsTable />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
