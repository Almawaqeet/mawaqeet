'use client';

import { useCallback, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  readOnly,
}: RichTextEditorProps) => {
  const reactQuillRef = useRef<ReactQuill>(null);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      throw new Error('Missing Cloudinary configuration');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        { method: 'POST', body: formData }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || 'Failed to upload image');
      }

      const data = await res.json();
      const url = data?.secure_url;

      if (!url) {
        throw new Error('Failed to get upload URL');
      }

      return url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        try {
          const url = await uploadToCloudinary(file);
          const quill = reactQuillRef.current;
          if (quill) {
            const range = quill.getEditor().getSelection();
            range && quill.getEditor().insertEmbed(range.index, 'image', url);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'align',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value ?? ''}
        onChange={onChange}
        modules={readOnly ? { toolbar: false } : modules}
        formats={formats}
        placeholder={placeholder}
        className={`min-h-[200px] ${readOnly ? 'ql-editor-no-border' : ''}`}
        readOnly={readOnly}
      />
      <style jsx global>{`
        .ql-editor-no-border .ql-container.ql-snow {
          border: none !important;
        }
        .ql-editor {
          min-height: 200px !important;
        }
        .ql-container {
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
