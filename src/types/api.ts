// API-related types

export interface FieldDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url' | 'date' | 'uuid';
  isArray?: boolean;
  arrayLength?: number;
  children?: FieldDefinition[];
}

export interface ApiDefinition {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  fields: FieldDefinition[];
  count: number;
} 