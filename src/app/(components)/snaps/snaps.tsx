import { UploadFileEntity } from "@/lib/strapi/types"
import Image from "next/image"

export default function Snaps({ screenshots}: { screenshots: UploadFileEntity[] | null}) {
  if(!screenshots) return null
  
  return (
    <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3">
      {screenshots.map((screenshot, index) => (
        <Image
          key={screenshot.attributes?.name || index}
          className="object-cover aspect-square rounded-xl"
          src={screenshot?.attributes?.url || ""}
          alt={screenshot?.attributes?.alternativeText || screenshot?.attributes?.name || "Project screenshot"}
          {...(screenshot?.attributes?.width && {
            width: screenshot?.attributes?.width,
          })}
          {...(screenshot?.attributes?.height && {
            height: screenshot?.attributes?.height,
          })}
        />
      ))}
    </div>
  )
}
