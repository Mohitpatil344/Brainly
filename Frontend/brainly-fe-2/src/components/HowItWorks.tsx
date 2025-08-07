const HowItWorks: React.FC = () => {
    return (
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary text-primary-foreground p-3 mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Capture</h3>
              <p className="text-muted-foreground">Easily input your ideas, notes, and thoughts into the app.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary text-primary-foreground p-3 mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Organize</h3>
              <p className="text-muted-foreground">Categorize and link your information for easy retrieval.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary text-primary-foreground p-3 mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Retrieve</h3>
              <p className="text-muted-foreground">Quickly find and use your stored knowledge when you need it.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default HowItWorks
  
  