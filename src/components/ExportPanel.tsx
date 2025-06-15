'use client';

import { useState } from 'react';
import type { ApiDefinition } from '@/types/api';
import { generateApiResponse } from '@/utils/mockDataGenerator';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Copy, 
  Check, 
  FileJson, 
  FileText, 
  Code2, 
  Terminal, 
  Share,
  HelpCircle
} from "lucide-react";

interface ExportPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  apiDefinition: ApiDefinition;
}

type ExportFormat = 'json' | 'javascript' | 'typescript' | 'curl' | 'postman';

export function ExportPanel({ data, apiDefinition }: ExportPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState(false);

  const generateExportCode = (format: ExportFormat): string => {
    const responseData = generateApiResponse(apiDefinition, data);
    
    switch (format) {
      case 'json':
        return JSON.stringify(responseData, null, 2);
      
      case 'javascript':
        return `// Mock API Response
const mockData = ${JSON.stringify(responseData, null, 2)};

// Usage example
fetch('${apiDefinition.endpoint}')
  .then(response => response.json())
  .then(data => {
    // Use mockData for development
    console.log(mockData);
  });`;

      case 'typescript':
        return `// Mock API Response
interface ApiResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  timestamp: string;
  endpoint: string;
  method: string;
}

${generateTypeInterface()}

const mockData: ApiResponse<${generateTypeName()}> = ${JSON.stringify(responseData, null, 2)};

// Usage example
const fetchData = async (): Promise<ApiResponse<${generateTypeName()}>> => {
  // Return mock data for development
  return mockData;
};`;

      case 'curl':
        return `# cURL request example
curl -X ${apiDefinition.method} \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  "${apiDefinition.endpoint}"

# Expected response:
${JSON.stringify(responseData, null, 2)}`;

      case 'postman':
        return JSON.stringify({
          info: {
            name: `${apiDefinition.description} - Mock API`,
            description: `Generated mock API for ${apiDefinition.endpoint}`,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
          },
          item: [
            {
              name: apiDefinition.description,
              request: {
                method: apiDefinition.method,
                header: [
                  {
                    key: "Content-Type",
                    value: "application/json"
                  }
                ],
                url: {
                  raw: `{{baseUrl}}${apiDefinition.endpoint}`,
                  host: ["{{baseUrl}}"],
                  path: apiDefinition.endpoint.split('/').filter(Boolean)
                }
              },
              response: [
                {
                  name: "Success Response",
                  originalRequest: {
                    method: apiDefinition.method,
                    header: [],
                    url: {
                      raw: `{{baseUrl}}${apiDefinition.endpoint}`,
                      host: ["{{baseUrl}}"],
                      path: apiDefinition.endpoint.split('/').filter(Boolean)
                    }
                  },
                  status: "OK",
                  code: 200,
                  header: [
                    {
                      key: "Content-Type",
                      value: "application/json"
                    }
                  ],
                  body: JSON.stringify(responseData, null, 2)
                }
              ]
            }
          ],
          variable: [
            {
              key: "baseUrl",
              value: "https://api.example.com"
            }
          ]
        }, null, 2);

      default:
        return JSON.stringify(responseData, null, 2);
    }
  };

  const generateTypeInterface = (): string => {
    const typeName = generateTypeName();
    const fields = apiDefinition.fields.map(field => {
      let fieldType = getTypeScriptType(field.type);
      if (field.isArray) {
        fieldType = `${fieldType}[]`;
      }
      return `  ${field.name}: ${fieldType};`;
    }).join('\n');

    return `interface ${typeName} {
${fields}
}`;
  };

  const generateTypeName = (): string => {
    return apiDefinition.endpoint
      .split('/')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') || 'ApiData';
  };

  const getTypeScriptType = (type: string): string => {
    switch (type) {
      case 'string':
      case 'email':
      case 'url':
      case 'date':
      case 'uuid':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      default:
        return 'any';
    }
  };

  const copyToClipboard = async () => {
    try {
      const code = generateExportCode(selectedFormat);
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadFile = () => {
    const code = generateExportCode(selectedFormat);
    const extension = getFileExtension(selectedFormat);
    const filename = `mock-api-${apiDefinition.endpoint.replace(/\//g, '-')}${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (format: ExportFormat): string => {
    switch (format) {
      case 'json':
        return '.json';
      case 'javascript':
        return '.js';
      case 'typescript':
        return '.ts';
      case 'curl':
        return '.sh';
      case 'postman':
        return '.postman_collection.json';
      default:
        return '.txt';
    }
  };

  const exportFormats = [
    { 
      value: 'json', 
      label: 'JSON', 
      icon: FileJson, 
      description: 'Raw data file'
    },
    { 
      value: 'javascript', 
      label: 'JavaScript', 
      icon: Code2, 
      description: 'Ready-to-use code'
    },
    { 
      value: 'typescript', 
      label: 'TypeScript', 
      icon: FileText, 
      description: 'Typed interfaces'
    },
    { 
      value: 'curl', 
      label: 'cURL', 
      icon: Terminal, 
      description: 'Command script'
    },
    { 
      value: 'postman', 
      label: 'Postman', 
      icon: Share, 
      description: 'API collection'
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Export Format Selection */}
      <Card className="bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Share className="w-5 h-5 text-muted-foreground" />
            Export Format
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {exportFormats.map(format => {
            const IconComponent = format.icon;
            return (
              <div
                key={format.value}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFormat === format.value
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-border hover:border-muted-foreground dark:hover:border-muted-foreground'
                }`}
                onClick={() => setSelectedFormat(format.value)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">
                      {format.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format.description}
                    </div>
                  </div>
                  {selectedFormat === format.value && (
                    <Badge variant="default" className="text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Code Preview */}
      {data.length > 0 && (
        <Card className="bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Preview
              </CardTitle>
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
          </CardHeader>
          
          <CardContent>
            <Card className="bg-background border-border">
              <CardContent className="p-0">
                <div className="max-h-48 overflow-auto">
                  <pre className="text-xs font-mono leading-relaxed p-4 text-muted-foreground">
                    {generateExportCode(selectedFormat)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={downloadFile}
          disabled={data.length === 0}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="w-4 h-4" />
          Download {selectedFormat.toUpperCase()} File
        </Button>
        
        <Button
          onClick={copyToClipboard}
          disabled={data.length === 0}
          variant="outline"
          className="w-full gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy to Clipboard
        </Button>
      </div>

      {/* Usage Tips */}
      <Card className="bg-muted">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">
                Quick Tips
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong>JSON:</strong> Use for databases or API testing</li>
                <li>• <strong>JavaScript/TypeScript:</strong> Drop into your project code</li>
                <li>• <strong>cURL:</strong> Test endpoints from command line</li>
                <li>• <strong>Postman:</strong> Import for team collaboration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 