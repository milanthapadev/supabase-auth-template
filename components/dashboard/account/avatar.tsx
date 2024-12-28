'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Avatar as AvatarUI, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Upload, User, Check } from 'lucide-react'

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setProgress(0)
      setIsComplete(false)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      // Optimistic update
      const optimisticUrl = URL.createObjectURL(file)
      setAvatarUrl(optimisticUrl)
      onUpload(optimisticUrl)

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
            const percent = (progressEvent.loaded / progressEvent.total) * 100
            setProgress(percent)
          },
        } as any)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      
      onUpload(data.publicUrl)
      setIsComplete(true)
    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert('Error uploading avatar!')
      // Revert optimistic update
      setAvatarUrl(url)
    } finally {
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        <AvatarUI className="w-full h-full border-2 border-primary">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt="Avatar" />
          ) : (
            <AvatarFallback>
              <User className="w-16 h-16 text-muted-foreground" />
            </AvatarFallback>
          )}
        </AvatarUI>
        {uploading && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8%"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8%"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              strokeLinecap="round"
            />
          </svg>
        )}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-50 rounded-full">
            <Check className="w-16 h-16 text-white" />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
          aria-label="Upload avatar"
        />
        <Button 
          onClick={handleButtonClick}
          disabled={uploading}
          variant="outline"
        >
          {uploading ? (
            <>
              Uploading... {Math.round(progress)}%
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Avatar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

