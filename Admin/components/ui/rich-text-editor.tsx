"use client"

import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  id?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start typing...",
  minHeight = "150px",
  id
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const isCommandActive = (command: string): boolean => {
    return document.queryCommandState(command)
  }

  const ToolbarButton = ({ 
    icon: Icon, 
    command, 
    title 
  }: { 
    icon: any
    command: string
    title: string 
  }) => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      const updateState = () => {
        setIsActive(isCommandActive(command))
      }

      const editor = editorRef.current
      if (editor) {
        editor.addEventListener('keyup', updateState)
        editor.addEventListener('mouseup', updateState)
        editor.addEventListener('focus', updateState)
        
        return () => {
          editor.removeEventListener('keyup', updateState)
          editor.removeEventListener('mouseup', updateState)
          editor.removeEventListener('focus', updateState)
        }
      }
    }, [command])

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          isActive && "bg-accent text-accent-foreground"
        )}
        onClick={() => execCommand(command)}
        title={title}
      >
        <Icon className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className={cn(
      "rounded-md border border-input bg-background",
      isFocused && "ring-2 ring-ring ring-offset-2"
    )}>
      {/* Toolbar */}
      <div className="border-b border-input p-2 flex items-center gap-1 flex-wrap">
        <ToolbarButton icon={Bold} command="bold" title="Bold (Ctrl+B)" />
        <ToolbarButton icon={Italic} command="italic" title="Italic (Ctrl+I)" />
        <ToolbarButton icon={Underline} command="underline" title="Underline (Ctrl+U)" />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
        <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <ToolbarButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
        <ToolbarButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
        <ToolbarButton icon={AlignRight} command="justifyRight" title="Align Right" />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        id={id}
        className={cn(
          "px-3 py-2 text-sm outline-none overflow-auto",
          "prose prose-sm max-w-none",
          "[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground"
        )}
        style={{ minHeight }}
        data-placeholder={placeholder}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suppressContentEditableWarning
      />
    </div>
  )
}