'use client';

import { useState } from 'react';
import type { ApiDefinition, FieldDefinition } from '@/types/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, ChevronDown, ChevronRight, Settings, Database } from "lucide-react";

interface JsonSchemaFormProps {
  apiDefinition: ApiDefinition;
  onChange: (definition: ApiDefinition) => void;
  onGenerate: () => void;
}

const FIELD_TYPES = [
  { value: 'string', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'date', label: 'Date' },
  { value: 'uuid', label: 'UUID' },
  { value: 'array', label: 'Array' },
  { value: 'object', label: 'Object' },
] as const;

const HTTP_METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

export function JsonSchemaForm({ apiDefinition, onChange, onGenerate }: JsonSchemaFormProps) {
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());

  const updateApiDefinition = (updates: Partial<ApiDefinition>) => {
    onChange({ ...apiDefinition, ...updates });
  };

  const updateField = (index: number, updates: Partial<FieldDefinition>) => {
    const newFields = [...apiDefinition.fields];
    newFields[index] = { ...newFields[index], ...updates };
    updateApiDefinition({ fields: newFields });
  };

  const addField = () => {
    const newField: FieldDefinition = {
      name: `field_${apiDefinition.fields.length + 1}`,
      type: 'string',
    };
    updateApiDefinition({ fields: [...apiDefinition.fields, newField] });
  };

  const removeField = (index: number) => {
    const newFields = apiDefinition.fields.filter((_, i) => i !== index);
    updateApiDefinition({ fields: newFields });
  };

  const addChildField = (parentIndex: number) => {
    const newFields = [...apiDefinition.fields];
    const parentField = newFields[parentIndex];
    
    if (!parentField.children) {
      parentField.children = [];
    }
    
    const newChildField: FieldDefinition = {
      name: `child_${parentField.children.length + 1}`,
      type: 'string',
    };
    
    parentField.children.push(newChildField);
    updateApiDefinition({ fields: newFields });
  };

  const updateChildField = (parentIndex: number, childIndex: number, updates: Partial<FieldDefinition>) => {
    const newFields = [...apiDefinition.fields];
    if (newFields[parentIndex].children) {
      newFields[parentIndex].children![childIndex] = { 
        ...newFields[parentIndex].children![childIndex], 
        ...updates 
      };
      updateApiDefinition({ fields: newFields });
    }
  };

  const removeChildField = (parentIndex: number, childIndex: number) => {
    const newFields = [...apiDefinition.fields];
    if (newFields[parentIndex].children) {
      newFields[parentIndex].children = newFields[parentIndex].children!.filter((_, i) => i !== childIndex);
      updateApiDefinition({ fields: newFields });
    }
  };

  const toggleFieldExpansion = (fieldKey: string) => {
    const newExpanded = new Set(expandedFields);
    if (newExpanded.has(fieldKey)) {
      newExpanded.delete(fieldKey);
    } else {
      newExpanded.add(fieldKey);
    }
    setExpandedFields(newExpanded);
  };

  return (
    <div className="space-y-8">
      {/* API Settings */}
      <Card className="bg-card">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 text-muted-foreground" />
            API Configuration
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint" className="text-sm font-medium text-foreground">
                Endpoint
              </Label>
              <Input
                id="endpoint"
                value={apiDefinition.endpoint}
                onChange={(e) => updateApiDefinition({ endpoint: e.target.value })}
                placeholder="/api/users"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Method
                </Label>
                <Select
                  value={apiDefinition.method}
                  onValueChange={(value) => updateApiDefinition({ method: value as typeof apiDefinition.method })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HTTP_METHODS.map(method => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="text-sm font-medium text-foreground">
                  Records
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="50"
                  value={apiDefinition.count}
                  onChange={(e) => updateApiDefinition({ count: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Input
                id="description"
                value={apiDefinition.description}
                onChange={(e) => updateApiDefinition({ description: e.target.value })}
                placeholder="Describe what this API endpoint does"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fields */}
      <Card className="bg-card">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Database className="w-5 h-5 text-muted-foreground" />
              Data Fields
            </CardTitle>
            <Button 
              onClick={addField} 
              size="sm" 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add Field
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {apiDefinition.fields.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No fields defined
              </h3>
              <p className="text-sm mb-4">
                Add some fields to define your JSON structure
              </p>
              <Button onClick={addField} variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Field
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                <div className="col-span-4">Field Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-2">Array</div>
                <div className="col-span-2">Length</div>
                <div className="col-span-1 text-center">Action</div>
              </div>
              
              {apiDefinition.fields.map((field, index) => (
                <div key={index} className="border border-border rounded-md bg-card hover:bg-muted transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center p-3">
                    {/* Field Name */}
                    <div className="col-span-4">
                      <Input
                        value={field.name}
                        onChange={(e) => updateField(index, { name: e.target.value })}
                        placeholder="field_name"
                        className="font-mono text-sm h-8"
                      />
                    </div>
                    
                    {/* Type */}
                    <div className="col-span-3">
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateField(index, { type: value as FieldDefinition['type'] })}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Array Toggle */}
                    <div className="col-span-2 flex items-center justify-center">
                      <Switch
                        id={`array-${index}`}
                        checked={field.isArray || false}
                        onCheckedChange={(checked) => updateField(index, { isArray: checked })}
                      />
                    </div>

                    {/* Array Length */}
                    <div className="col-span-2">
                      {field.isArray ? (
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={field.arrayLength || 3}
                          onChange={(e) => updateField(index, { arrayLength: parseInt(e.target.value) || 3 })}
                          className="h-8 text-sm"
                          placeholder="3"
                        />
                      ) : (
                        <div className="h-8 flex items-center justify-center text-xs text-muted-foreground">—</div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-1 flex justify-center">
                      <Button
                        onClick={() => removeField(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Child fields for object/array types */}
                  {(field.type === 'object' || field.type === 'array') && (
                    <div className="px-3 pb-3">
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between mb-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFieldExpansion(`field-${index}`)}
                            className="gap-2 text-muted-foreground h-7 px-2 text-xs"
                          >
                            {expandedFields.has(`field-${index}`) ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                            Child Fields
                            {field.children && field.children.length > 0 && (
                              <Badge variant="outline" className="text-xs px-1 py-0 ml-1">
                                {field.children.length}
                              </Badge>
                            )}
                          </Button>
                          <Button
                            onClick={() => addChildField(index)}
                            variant="outline"
                            size="sm"
                            className="gap-1 h-7 px-2 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                            Add Child
                          </Button>
                        </div>

                        {expandedFields.has(`field-${index}`) && field.children && (
                          <div className="space-y-2 pl-3 border-l-2 border-border">
                            {field.children.map((childField, childIndex) => (
                              <div key={childIndex} className="flex items-center gap-2 p-2 bg-muted rounded border">
                                <Input
                                  value={childField.name}
                                  onChange={(e) => updateChildField(index, childIndex, { name: e.target.value })}
                                  placeholder="child_field"
                                  className="font-mono text-sm h-7 flex-1"
                                />
                                <Select
                                  value={childField.type}
                                  onValueChange={(value) => updateChildField(index, childIndex, { type: value as FieldDefinition['type'] })}
                                >
                                  <SelectTrigger className="w-28 h-7">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {FIELD_TYPES.filter(t => !['array', 'object'].includes(t.value)).map(type => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  onClick={() => removeChildField(index, childIndex)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={apiDefinition.fields.length === 0}
      >
        Generate Mock Data
      </Button>
    </div>
  );
} 