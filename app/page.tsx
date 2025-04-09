import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats  from "@/components/Stats";
import Services  from "@/components/Services";
import Appointment from "@/components/Appointment";
import Departments from "@/components/Departments";
import Doctors from "@/components/Doctors";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import AnimatedGallery from "@/components/AnimatedGallery";
import SuccessStories from "@/components/SuccessStories";
import ChatBot from "@/components/ChatBot";



const galleryImages = [
  { 
    src: "/images/gallery/gallery1.jpg", 
    alt: "Physical therapy session" 
  },
  { 
    src: "/images/gallery/gallery2.jpg", 
    alt: "Modern rehabilitation equipment" 
  },
  { 
    src: "/images/gallery/gallery3.jpg", 
    alt: "Physical therapy session" 
  },
  { 
    src: "/images/gallery/gallery4.jpg", 
    alt: "Modern rehabilitation equipment" 
  },
  { 
    src: "/images/gallery/gallery5.jpg", 
    alt: "Physical therapy session" 
  },
  { 
    src: "/images/gallery/gallery7.jpg", 
    alt: "Modern rehabilitation equipment" 
  },
  
];


function Home() {

  return (
    
    <main>
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Appointment />
      <Departments />
      <Doctors />
      <FAQ />
      <AnimatedGallery 
        images={galleryImages}
        title="Rehabilitation Gallery" 
        subtitle="Explore our facilities and rehabilitation programs in action"
      />
      <Pricing />
      <SuccessStories />
      <Contact />
      <ChatBot />
      <Footer/>
    </main>
  );
}

export default  Home;