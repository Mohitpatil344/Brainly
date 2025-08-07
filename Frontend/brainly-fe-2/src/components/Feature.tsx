import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card2"
import { Lightbulb, Search, Share2 } from 'lucide-react'

const Feature: React.FC = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Lightbulb className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Idea Capture</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quickly capture and organize your ideas, inspirations, and thoughts in one place.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Search className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Smart Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Find any piece of information instantly with our powerful search capabilities.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Share2 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Seamless Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access your second brain across all your devices with real-time synchronization.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Feature

