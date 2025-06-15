'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Github, Send, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export function FeatureRequest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send this to your backend
    // For now, we'll just simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setTitle('');
    setDescription('');
    setIsSubmitting(false);

    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Alpha Version</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Help Shape the Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're in alpha and your feedback is invaluable. Request features, report bugs, or suggest improvements.
          </p>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Request a Feature</CardTitle>
            <CardDescription>
              Tell us what you'd like to see in MockAPI Studio. Your suggestions help us build a better tool.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignedIn>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Feature Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Add support for GraphQL schema generation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your feature request in detail. What problem does it solve? How would you use it?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[120px] bg-background/50"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : isSubmitted ? (
                      <>
                        <Send className="w-4 h-4" />
                        Submitted!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open('https://github.com/yourusername/mockapi-studio/issues', '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </div>
              </form>
            </SignedIn>

            <SignedOut>
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">
                  Sign in to submit feature requests and track their status.
                </p>
                <SignInButton mode="modal">
                  <Button className="gap-2">
                    <Github className="w-4 h-4" />
                    Sign in with GitHub
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
          </CardContent>
        </Card>

        {/* Feature Request Guidelines */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="font-medium text-foreground mb-2">Be Specific</h3>
            <p>Describe your use case and how the feature would help you.</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="font-medium text-foreground mb-2">Check Existing</h3>
            <p>Search existing requests to avoid duplicates and show support.</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="font-medium text-foreground mb-2">Stay Updated</h3>
            <p>We'll notify you when your requested feature is implemented.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 