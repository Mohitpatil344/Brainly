import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Feature from "../components/Feature"
import HowItWorks from "../components/HowItWorks";



export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
     <Feature/>
     <HowItWorks/>
      <Footer />

    </>
  );
}

export default Home;
