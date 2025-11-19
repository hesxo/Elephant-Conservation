// Ambient module declarations for imports that include package versions in the specifier
// e.g. "lucide-react@0.487.0" or "@radix-ui/react-dialog@1.1.6"
declare module '*@*' {
  const value: any;
  export = value;
}

// Match scoped packages that include a version suffix, e.g. "@radix-ui/react-label@2.1.2"
declare module '@*/*@*' {
  const value: any;
  export = value;
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
}
