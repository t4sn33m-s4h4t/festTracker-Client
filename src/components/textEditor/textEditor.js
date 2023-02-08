import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor = () => {
  const [desc, setDesc] = useState('');

  const handleEditorChange = (event, editor) => {
    setDesc(editor.getData());
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={desc}
      onChange={handleEditorChange}
    />
  );
};

export default TextEditor;
