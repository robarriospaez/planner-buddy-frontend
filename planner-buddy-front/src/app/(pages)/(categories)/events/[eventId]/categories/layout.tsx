import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CategoryLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
