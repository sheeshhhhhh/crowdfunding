import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from '@/components/ui/toggle';
import Heading from '@tiptap/extension-heading';

type TiptapProps = {
    body?: string,
    onChange: (richText: string) => void
}


const Tiptap = ({
    body="",
    onChange
}: TiptapProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Heading.configure({
                HTMLAttributes: {
                    class: '',
                    levels: [1, 2, 3]
                },             
            }).extend({
                addAttributes() {
                    return { class: { default: null } } // it needs return
                },
                renderHTML({ node, HTMLAttributes }) {
                    const level = node.attrs.level as 1 | 2 | 3; // added union type
                    const classMap = {
                      1: 'text-4xl font-bold mb-4',
                      2: 'text-3xl font-semibold mb-3',
                      3: 'text-2xl font-medium mb-2',
                    };
                    const classes = classMap[level] || '';
                    return [
                      `h${level}`,
                      { ...HTMLAttributes, class: classes },
                      0,
                    ];
                },
            })
        ],
        content: body,
        editorProps: {
            attributes: {
                class: 'border-none outline-none min-h-[400px]'
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })

    return (
      <div id="tiptap-react" 
      className='flex flex-col justify-stretch space-y-1'>
        <ToolBar editor={editor} />
        <div className='p-3 border rounded-lg'>
            <EditorContent editor={editor} />
        </div>
      </div>
    )
}

type ToolBarProps = {
    editor: Editor | null
}

const ToolBar = ({
    editor
}: ToolBarProps) => {
    if(!editor) return null

    return (
        <div className='border border-input bg-transparent rounded-md'>
            <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 1 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className='h-4 w-4' />
            </Toggle>
            <Toggle 
            size="sm"
            pressed={editor.isActive('heading', { level: 2 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 3 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className='h-4 w-4' />
            </Toggle>
            <Toggle 
            size="sm"
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle 
            size="sm"
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle 
            size="sm"
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
            size="sm"
            pressed={editor.isActive('bulletList')}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
            size="sm"
            pressed={editor.isActive('orderedList')}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export default Tiptap