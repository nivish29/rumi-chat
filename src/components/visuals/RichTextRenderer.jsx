import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


const RichTextRenderer = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const components = {
    h1: ({ children }) => (
      <Typography variant="h1" sx={{ 
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#1a1a1a'
      }}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography
        variant="h2"
        sx={{
          fontSize: {xs:'1.2rem',sm:'1.5rem'},
          fontWeight:600, // Responsive font weight
          mb: 2,
          color: '#2d2d2d',
        }}
      >
        {children}
      </Typography>
    ),
    
    h3: ({ children }) => (
      <Typography variant="h3" sx={{ 
        fontSize: '1.3rem',
        fontWeight: 400,
        mb: 1.5,
        color: '#333333'
      }}>
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography variant="body1" sx={{ 
        fontSize: '0.7rem',
        lineHeight: 1.7,
        mb: 2,
        color: '#4a4a4a'
      }}>
        {children}
      </Typography>
    ),
    code: ({ inline, className, children }) => {
      if (inline) {
        return <code className={className} style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#c0c0c0' }}>{children}</code>;
      }
      const language = className ? className.replace('language-', '') : 'javascript'; // Default to 'javascript' if no language specified
      return (
        <SyntaxHighlighter language={language} style={docco}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <Box sx={{ 
      '& pre': { 
        background: '#2d2d2d',
        padding: 2,
        borderRadius: 1,
        overflow: 'auto',
        mb: 2
      },
      '& code': {
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
        fontSize: '0.9rem'
      },
      '& ul, & ol': {
        paddingLeft: 3,
        mb: 2,
        '& li': {
          mb: 1,
          color: '#4a4a4a'
        }
      },
      '& blockquote': {
        borderLeft: '4px solid #e0e0e0',
        margin: '1rem 0',
        padding: '0.5rem 0 0.5rem 1rem',
        color: '#666666',
        fontStyle: 'italic',
        background: '#f8f8f8',
        borderRadius: '0 4px 4px 0'
      },
      '& a': {
        color: '#2196f3',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 1,
        mb: 2
      },
      '& hr': {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        my: 3
      }
    }}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </Box>
  );
};

export default RichTextRenderer; 