import type { FieldDefinition, ApiDefinition } from '@/types/api';

// Mock data generators for different types
const generators = {
  string: () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const adjectives = ['awesome', 'brilliant', 'creative', 'dynamic', 'elegant', 'fantastic'];
    const nouns = ['project', 'solution', 'system', 'platform', 'service', 'application'];
    
    return Math.random() > 0.5 
      ? names[Math.floor(Math.random() * names.length)]
      : `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  },
  
  number: () => Math.floor(Math.random() * 1000) + 1,
  
  boolean: () => Math.random() > 0.5,
  
  email: () => {
    const domains = ['example.com', 'test.org', 'demo.net', 'sample.io'];
    const usernames = ['user', 'admin', 'test', 'demo', 'sample'];
    const username = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 999);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  },
  
  url: () => {
    const protocols = ['https://'];
    const domains = ['example.com', 'test.org', 'demo.net', 'api.sample.io'];
    const paths = ['/api/v1', '/dashboard', '/profile', '/settings', '/data'];
    
    return `${protocols[0]}${domains[Math.floor(Math.random() * domains.length)]}${paths[Math.floor(Math.random() * paths.length)]}`;
  },
  
  date: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  },
  
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};

function generateFieldValue(field: FieldDefinition): any {
  if (field.isArray) {
    const arrayLength = field.arrayLength || 3;
    return Array.from({ length: arrayLength }, () => generateSingleFieldValue(field));
  }
  
  return generateSingleFieldValue(field);
}

function generateSingleFieldValue(field: FieldDefinition): any {
  if (field.type === 'object' && field.children) {
    const obj: Record<string, any> = {};
    field.children.forEach(childField => {
      obj[childField.name] = generateFieldValue(childField);
    });
    return obj;
  }
  
  if (field.type === 'array' && field.children) {
    const arrayLength = field.arrayLength || 3;
    return Array.from({ length: arrayLength }, () => {
      if (field.children!.length === 1) {
        return generateFieldValue(field.children![0]);
      } else {
        const obj: Record<string, any> = {};
        field.children!.forEach(childField => {
          obj[childField.name] = generateFieldValue(childField);
        });
        return obj;
      }
    });
  }
  
  const generator = generators[field.type as keyof typeof generators];
  return generator ? generator() : `sample_${field.type}`;
}

export function generateMockData(apiDefinition: ApiDefinition): any[] {
  const { fields, count } = apiDefinition;
  
  return Array.from({ length: count }, (_, index) => {
    const item: Record<string, any> = {};
    
    fields.forEach(field => {
      item[field.name] = generateFieldValue(field);
    });
    
    return item;
  });
}

export function generateApiResponse(apiDefinition: ApiDefinition, data: any[]) {
  return {
    success: true,
    data: data,
    total: data.length,
    timestamp: new Date().toISOString(),
    endpoint: apiDefinition.endpoint,
    method: apiDefinition.method
  };
} 