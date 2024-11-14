import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TodoForm({ onAddTodo }: { onAddTodo?: (title: string, completed: boolean) => void } = {}) {
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo?.(title, completed)
      setTitle('')
      setCompleted(false)
    }
  }

  return (
    
  )
}