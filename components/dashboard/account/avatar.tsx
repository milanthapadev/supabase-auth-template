'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Upload, Trash2, User } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"


export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const { toast } = useToast()
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
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

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      console.log('Error downloading image: ', error)
      toast({
        title: "Error downloading avatar!",
      })
    } finally {
      setUploading(false)
    }
  }

  const deleteAvatar = async () => {
    try {
      if (!avatarUrl) return

      const { error } = await supabase.storage.from('avatars').remove([avatarUrl])

      if (error) {
        throw error
      }

      setAvatarUrl(null)
      onUpload('')
    } catch (error) {
      console.log('Error deleting image: ', error)
      toast({
        title: "Error deleting avatar!",
      })
    }
  }

  return (
    <div className="relative group" style={{ width: size, height: size }}>
      <div className="relative w-full h-full rounded-full overflow-hidden transition-all duration-300 ease-in-out transform group-hover:scale-110">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="text-gray-400" size={size / 2} />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <label htmlFor="avatar-upload" className="cursor-pointer p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 mr-2">
            <Upload className="text-gray-600" size={size / 4} />
          </label>
          {avatarUrl && (
            <button
              onClick={deleteAvatar}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Trash2 className="text-red-500" size={size / 4} />
            </button>
          )}
        </div>
      </div>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}

