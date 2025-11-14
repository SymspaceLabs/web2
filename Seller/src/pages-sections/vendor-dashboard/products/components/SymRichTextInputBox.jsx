import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill's default theme
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Import your desired highlight.js theme
import './RichTextEditor.css'; // Your custom styles
import { Box, FormLabel, Tooltip, IconButton } from '@mui/material';
import { InfoOutlined } from "@mui/icons-material";

// Quill editor modules
const getModules = (simple) => ({
  toolbar: simple
    ? [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
      ]
    : [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        // ['link', 'blockquote', 'code-block'],
        [{ align: [] }],
        // [{ color: [] }, { background: [] }],
      ],
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
});

const SymRichTextInputBox = ({ id, placeholder, value, onChange, simple }) => {
  // Memoizing the modules to prevent unnecessary re-renders
  const modules = useMemo(() => getModules(simple), [simple]);

  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormLabel sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                Description
            </FormLabel>
            <Tooltip title="Provide a detailed description of the product">
                <IconButton>
                    <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
                </IconButton>
            </Tooltip>
        </Box>
        <ReactQuill
            id={id}
            value={value}
            onChange={onChange}
            modules={modules}
            theme="snow"
            placeholder={placeholder || 'Enter text here...'}
        />
    </div>
  );
};

export default SymRichTextInputBox;
