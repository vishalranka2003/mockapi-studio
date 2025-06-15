'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Zap, 
  Download, 
  Database, 
  Globe, 
  Users, 
  Timer,
  CheckCircle,
  ArrowRight,
  Github,
  Star
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Code2,
      title: "Visual Schema Builder",
      description: "Create complex JSON structures with an intuitive drag-and-drop interface. No coding required."
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Generate realistic mock data instantly with support for various data types and nested objects."
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Export as JSON, JavaScript, TypeScript, cURL commands, or Postman collections."
    },
    {
      icon: Database,
      title: "Rich Data Types",
      description: "Support for strings, numbers, emails, URLs, dates, UUIDs, arrays, and nested objects."
    },
    {
      icon: Globe,
      title: "API-Ready Output",
      description: "Generate production-ready API responses with proper structure and metadata."
    },
    {
      icon: Timer,
      title: "Save Development Time",
      description: "Stop waiting for backend APIs. Start frontend development immediately with realistic data."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      quote: "This tool saved me hours of work. I can now prototype APIs without waiting for the backend team.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      quote: "Perfect for testing and development. The export options are incredibly useful for our workflow.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Product Manager",
      company: "InnovateLabs",
      quote: "Great for creating realistic demos and prototypes. Our clients love seeing working examples.",
      rating: 5
    }
  ];

  const useCases = [
    "Frontend Development & Prototyping",
    "API Documentation & Examples", 
    "Testing & Quality Assurance",
    "Client Demos & Presentations",
    "Learning & Education",
    "Backend Development Planning"
  ];

  return (
    <div className="min-h-screen bg-background">
    

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
              <div className="w-72 h-16 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-xl blur-lg opacity-60"></div>
            </div>
            <Badge
              variant="outline"
              className="relative z-10 px-4 py-2 text-sm bg-primary/30 border border-primary/40 backdrop-blur-lg shadow-sm"
            >
              🚀 Used by 10,000+ developers worldwide
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Create Mock
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> APIs </span>
            in Seconds
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Design, generate, and export professional mock API responses for development, testing, and prototyping. 
            No backend required. No signup needed. Just pure productivity.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button 
              onClick={onGetStarted} 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent text-primary-foreground text-lg px-8 py-6"
            >
              Start Building APIs
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6">
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-2 bg-card">
              <div className="bg-muted rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground text-sm ml-4">Mock API Response</span>
                </div>
                <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://api.example.com/avatars/1"
    }
  ],
  "total": 5,
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Mock APIs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to accelerate your development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-card/80 to-card/50 dark:from-card/90 dark:to-card/70">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Perfect for Every Development Stage
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you&apos;re prototyping, testing, or building production apps, 
                our tool adapts to your needs.
              </p>
              
              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">10,000+</h3>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 border-green-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <Timer className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-foreground">5 Minutes</h3>
                    <p className="text-sm text-muted-foreground">Average Time to Create API</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <Download className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="font-semibold text-foreground">50,000+</h3>
                    <p className="text-sm text-muted-foreground">APIs Generated</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what developers are saying about our tool
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 bg-gradient-to-br from-card/80 to-card/50 dark:from-card/90 dark:to-card/70">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/90 to-accent/90 dark:from-primary dark:to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Accelerate Your Development?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of developers who are already using our tool to build better APIs faster.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-primary-foreground/80 text-sm mt-4">
            No signup required • Free forever • No credit card needed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MockAPI Studio</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Professional API mocking for modern developers
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>© 2024 MockAPI Studio</span>
            <span>•</span>
            <span>Open Source</span>
            <span>•</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 