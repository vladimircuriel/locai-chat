/** biome-ignore-all lint/suspicious/noArrayIndexKey: it does not affect */
import { Badge, Button, Image } from '@heroui/react'
import { Icon } from '@iconify/react'

interface PromptInputAssetsProps {
  assets: string[]
  onRemoveAsset: (index: number) => void
}

const PromptInputAssets = ({ assets, onRemoveAsset }: PromptInputAssetsProps) => {
  if (assets.length === 0) return null

  return (
    <>
      {assets.map((asset, index) => (
        <Badge
          key={index}
          isOneChar
          className="opacity-0 group-hover:opacity-100"
          content={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onPress={() => onRemoveAsset(index)}
            >
              <Icon className="text-foreground" icon="iconamoon:close-thin" width={16} />
            </Button>
          }
        >
          <Image
            alt="uploaded image"
            className="rounded-small border-small border-default-200/50 h-14 w-14 object-cover"
            src={asset}
          />
        </Badge>
      ))}
    </>
  )
}

export default PromptInputAssets
