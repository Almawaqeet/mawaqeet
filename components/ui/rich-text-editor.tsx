'use client';

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import DropCursor from '@tiptap/extension-dropcursor';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Type,
  Video as VideoIcon,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import { cn, uploadToCloudinary } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Youtube from '@tiptap/extension-youtube';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your content...',
  className,
  readOnly = false,
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-color-main hover:text-hover-color underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg w-full max-w-full aspect-video my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
        emptyEditorClass: 'is-editor-empty',
      }),
      DropCursor.configure({
        color: '#875929',
        width: 2,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !readOnly,
  });

  // Update editor editable state when readOnly prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setIsUploading(true);
          const imageUrl = await uploadToCloudinary(file);
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addVideo = () => {
    const url = window.prompt('Enter YouTube URL');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const editorContainer = (
    <div
      className={cn(
        'border border-brand-color-light rounded-lg bg-brand-color-white overflow-hidden relative shadow-sm',
        isFullScreen ? 'fixed inset-0 z-50 rounded-none border-0' : '',
        className
      )}
      style={{ position: isFullScreen ? 'fixed' : 'relative' }}
    >
      {!readOnly && (
        <div
          className="border-b border-brand-color-light bg-brand-color-subtle p-3 flex flex-wrap gap-2 items-center"
          style={{ position: 'sticky', top: 0, zIndex: 10 }}
        >
          <div className="flex-1 flex flex-wrap gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('paragraph') &&
                  'bg-brand-color-light text-brand-color'
              )}
              title="Paragraph"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('bold') &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('italic') &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('heading', { level: 1 }) &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('heading', { level: 2 }) &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('bulletList') &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('orderedList') &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                'hover:bg-brand-color-light hover:text-brand-color transition-colors',
                editor.isActive('blockquote') &&
                  'bg-brand-color-light text-brand-color'
              )}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addLink}
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImageUpload}
              disabled={isUploading}
              title="Upload image from your device"
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors disabled:opacity-50"
            >
              <ImageIcon className="h-4 w-4" />
              {isUploading && (
                <span className="ml-1 text-xs text-brand-color-text">
                  Uploading...
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={addVideo}
              title="Add YouTube video"
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors"
            >
              <VideoIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors disabled:opacity-50"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors disabled:opacity-50"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullScreen}
              title={isFullScreen ? 'Exit full screen' : 'Full screen mode'}
              className="hover:bg-brand-color-light hover:text-brand-color transition-colors"
            >
              {isFullScreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            {isFullScreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullScreen}
                title="Close"
                className="hover:bg-brand-color-light hover:text-brand-color transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {editor && !readOnly && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-brand-color-white shadow-lg rounded-lg p-2 flex gap-1 border border-brand-color-light"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              'hover:bg-brand-color-light hover:text-brand-color transition-colors',
              editor.isActive('bold') && 'bg-brand-color-light text-brand-color'
            )}
          >
            <Bold className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              'hover:bg-brand-color-light hover:text-brand-color transition-colors',
              editor.isActive('italic') &&
                'bg-brand-color-light text-brand-color'
            )}
          >
            <Italic className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={addLink}
            className="hover:bg-brand-color-light hover:text-brand-color transition-colors"
          >
            <LinkIcon className="h-3 w-3" />
          </Button>
        </BubbleMenu>
      )}

      {editor && !readOnly && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-brand-color-white shadow-lg rounded-lg p-2 flex flex-col gap-1 border border-brand-color-light"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="flex items-center justify-start hover:bg-brand-color-light hover:text-brand-color transition-colors"
          >
            <Heading1 className="h-3 w-3 mr-2" /> Heading 1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="flex items-center justify-start hover:bg-brand-color-light hover:text-brand-color transition-colors"
          >
            <Heading2 className="h-3 w-3 mr-2" /> Heading 2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="flex items-center justify-start hover:bg-brand-color-light hover:text-brand-color transition-colors"
          >
            <List className="h-3 w-3 mr-2" /> Bullet List
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleImageUpload}
            className="flex items-center justify-start hover:bg-brand-color-light hover:text-brand-color transition-colors"
          >
            <ImageIcon className="h-3 w-3 mr-2" /> Image
          </Button>
        </FloatingMenu>
      )}

      <div
        className={cn(
          isFullScreen
            ? 'h-[calc(100vh-48px)] overflow-y-auto'
            : 'min-h-[14rem]'
        )}
      >
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 focus:outline-none text-brand-color-text"
        />
      </div>
      <style jsx global>{`
        .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #686868;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror:focus {
          outline: 2px solid #875929;
          outline-offset: -2px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #686868;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror {
          color: #686868;
          line-height: 1.6;
        }
        .ProseMirror p {
          margin: 1.2em 0;
        }
        .ProseMirror h1 {
          color: #251301;
          font-weight: 600;
          font-size: 2em;
          margin: 1em 0 0.5em;
          line-height: 1.2;
        }
        .ProseMirror h2 {
          color: #251301;
          font-weight: 600;
          font-size: 1.5em;
          margin: 1em 0 0.5em;
          line-height: 1.3;
        }
        .ProseMirror h3 {
          color: #251301;
          font-weight: 600;
          font-size: 1.25em;
          margin: 1em 0 0.5em;
          line-height: 1.4;
        }
        .ProseMirror strong {
          color: #251301;
        }
        .ProseMirror a {
          color: #875929;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .ProseMirror a:hover {
          color: #87592a;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #875929;
          background-color: #e5dbd0;
          margin: 1.5em 0;
          padding: 0.5em 1em;
          font-style: italic;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .ProseMirror ul li,
        .ProseMirror ol li {
          margin: 0.5em 0;
        }
        .ProseMirror ul li::marker {
          color: #875929;
        }
        .ProseMirror ol li::marker {
          color: #875929;
        }
        body.editor-fullscreen {
          overflow: hidden;
        }
      `}</style>
    </div>
  );

  return editorContainer;
}
