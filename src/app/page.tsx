import LandingStore from "@/components/LandingStore";
import Navbar from "@/components/layout/navbar/Navbar";

export default async function Home() {
  return (
    <main className="bg-background h-screen">
      <Navbar />

      <div className="container px-10 p-5 ">
        <LandingStore initialProducts={[]} />
      </div>
    </main>
  );
}
