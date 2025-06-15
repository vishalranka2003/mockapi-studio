'use client';
import { useState, useEffect } from 'react';
import { JsonSchemaForm } from '@/components/JsonSchemaForm';
import { JsonPreview } from '@/components/JsonPreview';
import { ExportPanel } from '@/components/ExportPanel';
import { generateMockData } from '@/utils/mockDataGenerator';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import type { ApiDefinition } from '@/types/api';

export default function ToolPage() {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Generate initial data
  useEffect(() => {
    const data = generateMockData(apiDefinition);
    setGeneratedData(data);
  }, []);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
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
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 