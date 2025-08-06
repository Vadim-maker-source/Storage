import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'

interface Props {
    file: Models.Document
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>
    onRemove: (email: string) => void
}

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
    <div className="mb-1 flex items-center gap-3 rounded-xl border border-[#F2F5F9]/40 bg-[#F2F4F8]/50 p-3">
        {/* @ts-expect-error - Временное решение, если name действительно есть */}
        <Thumbnail type={file.type} extension={file.extension} url={file.url} />
        <div className="flex flex-col flex-start">
            {/* @ts-expect-error - Временное решение, если name действительно есть */}
            <p className="text-[14px] leading-[20px] font-semibold mb-1">{file.name}</p>
            <FormattedDateTime date={file.$createdAt} className="text-[12px] leading-[16px] font-normal" />
        </div>
    </div>
)

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex">
        <p className="text-[14px] leading-[20px] font-normal w-[30%] text-[#333F4E] text-left">{label}</p>
        <p className="text-[14px] leading-[20px] font-semibold flex-1 text-left">{value}</p>
    </div>
)

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
        <ImageThumbnail file={file} />
        <div className="space-y-4 px-2 pt-2">
            {/* @ts-expect-error - Временное решение, если name действительно есть */}
        <DetailRow label="Format:" value={file.extension} />
        {/* @ts-expect-error - Временное решение, если name действительно есть */}
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        {/* @ts-expect-error - Временное решение, если name действительно есть */}
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
        </div>
    </>
  )
}






export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
        <ImageThumbnail file={file} />

        <div className="mt-2 space-y-2">
            <p className="text-[14px] leading-[20px] font-semibold pl-1 text-[#333F4E]">Share file with other users</p>
            <Input type="email" placeholder="Enter email address" onChange={e => onInputChange(e.target.value.trim().split(','))} className="shad-no-focus h-[52px] w-full rounded-full border px-4 shadow-drop-1" />
            <div className="pt-4">
                <div className="flex justify-between">
                    <p className="text-[14px] leading-[20px] font-semibold text-[#333F4E]">Shared with</p>
                    <p className="text-[14px] leading-[20px] font-semibold text-[#333F4E]">
                        {/* @ts-expect-error - Временное решение, если name действительно есть */}
                        {file.users.length}
                        </p>
                </div>
                <ul className="pt-2">
                    {/* @ts-expect-error - Временное решение, если name действительно есть */}
                    {file.users.map((email: string) => (
                        <li key={email} className="flex items-center justify-between gap-2">
                            <p className="text-[14px] leading-[20px] font-semibold">
                                {email}
                            </p>
                            <Button onClick={() => onRemove(email)} className="rounded-full bg-transparent text-[#333F4E] shadow-none hover:bg-transparent">
                                <Image src="/assets/icons/remove.svg" alt="Remove" width={24} height={24} className="aspect-square rounded-full" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  )
}