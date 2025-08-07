import { Button } from "../components/ui/button1";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Hero: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-accent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
              Your Digital Second Brain
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Organize your thoughts, boost your productivity, and unlock your full potential with our innovative second brain application.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
