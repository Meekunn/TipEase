import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  VStack,
  Input,
} from '@chakra-ui/react';
import { LuUpload, LuX } from 'react-icons/lu';

interface IImageUpload {
  value?: string | null;           
  fallbackName?: string;           
  onChange: (file: File, previewUrl: string) => void;  
  onClear?: () => void;            
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: { avatar: 'lg' as const, box: '60px' },
  md: { avatar: 'xl' as const, box: '80px' },
  lg: { avatar: '2xl' as const, box: '100px' },
};

const ImageUpload = ({
  value,
  fallbackName = '',
  onChange,
  onClear,
  size = 'md',
  // label = 'Upload photo',
}: IImageUpload) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const { avatar, box } = sizeMap[size];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file, url);

    e.target.value = '';
  };

  const handleClear = () => {
    setPreview(null);
    onClear?.();
  };

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  return (
    <VStack gap={4} align="center" w="full" mb={4}>
      <Box position="relative" w={box} h={box}>
        <Avatar.Root
          size={avatar}
          w={box}
          h={box}
          cursor="pointer"
          onClick={() => inputRef.current?.click()}
          _hover={{ opacity: 0.8 }}
          transition="opacity 0.2s"
        >
          <Avatar.Fallback name={fallbackName} />
          <Avatar.Image src={preview ?? ''} objectFit="cover" />
        </Avatar.Root>

        {!preview && (
          <Box
            position="absolute"
            bottom={0}
            right={0}
            bg="white"
            border="0.6px solid"
            borderColor="bgPrimary"
            borderRadius="full"
            p={1}
            cursor="pointer"
            onClick={() => inputRef.current?.click()}
            _hover={{ bg: 'bgSecondary' }}
            transition="background 0.2s"
          >
            <LuUpload size={12} />
          </Box>
        )}

        {preview && (
          <IconButton
            aria-label="Remove image"
            size="2xs"
            borderRadius="full"
            position="absolute"
            bottom={0}
            right={0}
            bg="white"
            border="0.6px solid"
            borderColor="red.500"
            color="red.500"
            _hover={{ bg: 'red.100' }}
            onClick={handleClear}
          >
            <LuX />
          </IconButton>
        )}

        <Input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          display="none"
          onChange={handleFileChange}
        />
      </Box>

      {/* <Button variant="solid" w="fit" px={6} borderRadius="xl" size="2xs" onClick={() => inputRef.current?.click()}>Change avatar</Button> */}
    </VStack>
  );
};

export default ImageUpload;