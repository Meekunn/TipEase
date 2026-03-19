import { useWallet } from "@/hooks/useWallet";
import { Dialog, Button, Portal, CloseButton, VStack, Field, Input, Textarea, InputGroup } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";
import { FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";
import ImageUpload from "../ImageUpload";
import { useEffect, useRef } from "react";
import { useUpdateUser } from "@/lib/mutations";

interface IEditProfileDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileDialog = ({open, setOpen}: IEditProfileDialog) => {

  const fileRef = useRef<File | null>(null);
  const { wallet } = useWallet();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<IEditProfileForm>({
    defaultValues: {
      tagName: '',
      bio: '',
      avatarUrl: null,
      instagram: '',
      twitter: '',
      tiktok: '',
    }
  })

  useEffect(() => {
    if (wallet) {
      reset({
        tagName: wallet.tagName?.slice(1) ?? '',
        bio: wallet.bio ?? '',
        avatarUrl: wallet.avatarUrl ?? null,
        instagram: wallet.instagram ?? '',
        twitter: wallet.twitter ?? '',
        tiktok: wallet.tiktok ?? '',
      });
    }
  }, [wallet, reset]);

  const onSubmit = (data: IEditProfileForm) => {
    updateUser(
      {
        tagName: `@${data.tagName}`,
        bio: data.bio,
        instagram: data.instagram,
        twitter: data.twitter,
        tiktok: data.tiktok,
        avatarFile: fileRef.current,
      },
      { onSuccess: () => setOpen(false) }
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Profile</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="edit-profile-form" onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                  <Controller
                    name="avatarUrl"
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        value={field.value}
                        fallbackName={wallet?.tagName?.charAt(0).toUpperCase() ?? wallet?.walletAddress}
                        size="lg"
                        onChange={(file, previewUrl) => {
                          fileRef.current = file;    
                          field.onChange(previewUrl); 
                        }}
                        onClear={() => {
                          fileRef.current = null;
                          field.onChange(null);
                        }}
                      />
                    )}
                  />
                  <Field.Root invalid={!!errors.tagName}>
                    <Field.Label>Tag Name</Field.Label>
                    <InputGroup startAddon="@">
                      <Input placeholder="johhny" {...register("tagName")} _placeholder={{fontSize: "xs"}}/>
                    </InputGroup>
                    {errors.tagName && <Field.ErrorText>{errors.tagName?.message}</Field.ErrorText>}
                  </Field.Root>
                  <Field.Root invalid={!!errors.bio}>
                    <Field.Label>Bio</Field.Label>
                    <Textarea maxH="5lh" h={28} maxLength={160} placeholder="A bit about yourself" {...register("bio")} _placeholder={{fontSize: "xs"}} />
                    {errors.bio && <Field.ErrorText>{errors.bio?.message}</Field.ErrorText>}
                  </Field.Root>
                  <Field.Root invalid={!!errors.instagram}>
                    <Field.Label>Instagram</Field.Label>
                    <InputGroup startElement={<FaInstagram />}>
                      <Input placeholder="https://www.instagram.com/username" {...register("instagram")} _placeholder={{fontSize: "xs"}}/>
                    </InputGroup>
                    {errors.instagram && <Field.ErrorText>{errors.instagram?.message}</Field.ErrorText>}
                  </Field.Root>
                  <Field.Root invalid={!!errors.twitter}>
                    <Field.Label>X (Twitter)</Field.Label>
                    <InputGroup startElement={<FaXTwitter />}>
                      <Input placeholder="https://x.com/username" {...register("twitter")} _placeholder={{fontSize: "xs"}}/>
                    </InputGroup>
                    {errors.twitter && <Field.ErrorText>{errors.twitter?.message}</Field.ErrorText>}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>TikTok</Field.Label>
                    <InputGroup startElement={<FaTiktok />}>
                      <Input placeholder="https://www.tiktok.com/@username" {...register("tiktok")} _placeholder={{fontSize: "xs"}}/>
                    </InputGroup>
                  </Field.Root>
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                form="edit-profile-form"
                loading={isPending}
                loadingText="Saving..."
              >
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default EditProfileDialog