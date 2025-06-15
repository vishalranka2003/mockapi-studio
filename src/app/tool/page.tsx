'use client';

import { useState, useEffect } from 'react';
import { JsonSchemaForm } from '@/components/JsonSchemaForm';
import { JsonPreview } from '@/components/JsonPreview';
import { ExportPanel } from '@/components/ExportPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { generateMockData } from '@/utils/mockDataGenerator';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Database } from "lucide-react";
import { useRouter } from 'next/navigation';
import type { ApiDefinition, FieldDefinition } from '@/types/api';

export default function ToolPage() {
  const router = useRouter();
  const [apiDefinition, setApiDefinition] = useState<ApiDefinition>({
    endpoint: '/api/users',
    method: 'GET',
    description: 'Get list of users',
    fields: [
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'email', type: 'email' },
    ],
    count: 5,
  });

  const [generatedData, setGeneratedData] = useState<Record<string, any>[]>([]);

  const handleGenerateData = () => {
    const data = generateMockData(apiDefinition);
    setGeneratedData(data);
  };

  const handleApiDefinitionChange = (newDefinition: ApiDefinition) => {
    setApiDefinition(newDefinition);
    // Auto-generate data when definition changes
    const data = generateMockData(newDefinition);
    setGeneratedData(data);
  };

  const handleBackToLanding = () => {
    router.push('/');
  };

  // Generate initial data
  useEffect(() => {
    const data = generateMockData(apiDefinition);
    setGeneratedData(data);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* App Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToLanding}
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    MockAPI Studio
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Professional API mocking
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                Free Tool
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main App Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            <JsonSchemaForm
              apiDefinition={apiDefinition}
              onChange={handleApiDefinitionChange}
              onGenerate={handleGenerateData}
            />
          </div>

          {/* Right Column - Preview and Export */}
          <div className="space-y-6">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  Preview
                  <Badge variant="secondary" className="text-xs">
                    {generatedData.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-6">
                <JsonPreview
                  data={generatedData}
                  apiDefinition={apiDefinition}
                />
              </TabsContent>
              
              <TabsContent value="export" className="mt-6">
                <ExportPanel
                  data={generatedData}
                  apiDefinition={apiDefinition}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Help */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-0">
              <h3 className="font-semibold text-foreground mb-2">
                🚀 Pro Tip
              </h3>
              <p className="text-sm text-muted-foreground">
                Your data is generated locally and never sent to our servers. 
                Everything happens in your browser for maximum privacy and speed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 