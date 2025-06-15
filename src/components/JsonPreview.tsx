'use client';

import { useState } from 'react';
import type { ApiDefinition } from '@/types/api';
import { generateApiResponse } from '@/utils/mockDataGenerator';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Eye, Code, FileJson, Clock } from "lucide-react";

interface JsonPreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  apiDefinition: ApiDefinition;
}

export function JsonPreview({ data, apiDefinition }: JsonPreviewProps) {
  const [viewMode, setViewMode] = useState<'array' | 'response'>('response');
  const [copied, setCopied] = useState(false);

  const displayData = viewMode === 'response' ? generateApiResponse(apiDefinition, data) : data;
  const jsonString = JSON.stringify(displayData, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatJson = (jsonStr: string) => {
    return jsonStr
      .replace(/("(?:\\.|[^"\\])*")(\s*:\s*)/g, '<span class="json-key">$1</span>$2')
      .replace(/:\s*("(?:\\.|[^"\\])*")/g, ': <span class="json-string">$1</span>')
      .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>');
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-success/10 text-success-foreground';
      case 'POST': return 'bg-primary/10 text-primary';
      case 'PUT': return 'bg-warning/10 text-warning-foreground';
      case 'DELETE': return 'bg-destructive/10 text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            JSON Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-1 gap-1">
              <Button
                variant={viewMode === 'response' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('response')}
                className="h-7 px-3 text-xs"
              >
                API Response
              </Button>
              <Button
                variant={viewMode === 'array' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('array')}
                className="h-7 px-3 text-xs"
              >
                Data Only
              </Button>
            </div>
            
            {/* Copy Button */}
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{data.length}</span> records
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{apiDefinition.fields.length}</span> fields
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{(jsonString.length / 1024).toFixed(1)}</span> KB
            </span>
          </div>
        </div>

        {/* Endpoint Info */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg border-l-4 border-primary">
          <div className="flex items-center gap-3">
            <Badge className={`${getMethodColor(apiDefinition.method)} font-mono text-xs`}>
              {apiDefinition.method}
            </Badge>
            <code className="text-sm font-mono text-foreground font-medium">
              {apiDefinition.endpoint}
            </code>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            Mock API
          </div>
        </div>

        {data.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <FileJson className="w-4 h-4" />
              {apiDefinition.description}
            </div>

            {/* JSON Display */}
            <Card className="bg-background border-border">
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-auto">
                  <pre className="text-sm font-mono leading-relaxed p-4 text-muted-foreground">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: formatJson(jsonString)
                      }}
                    />
                  </pre>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12 text-muted-foreground">
            <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No Data Generated Yet
            </h3>
            <p className="text-sm mb-4">
              Configure your API fields and click &quot;Generate Mock Data&quot; to see the JSON response here.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">1</div>
              <span>Add fields</span>
              <span>→</span>
              <div className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center font-semibold">2</div>
              <span>Generate data</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

<style jsx global>{`
  .json-key { color: var(--tw-prose-bold); font-weight: 500; }
  .json-string { color: var(--tw-prose-links); }
  .json-number { color: var(--tw-prose-counters); font-weight: 500; }
  .json-boolean { color: var(--tw-prose-quotes); font-weight: 500; }
  .json-null { color: var(--tw-prose-code); font-style: italic; }
`}</style> 