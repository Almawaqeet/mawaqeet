'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEditProfile, useViewProfile } from '@/api/services/authentication';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppToast } from '@/components/reusables/AppToast';
import { useEffect } from 'react';

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').nullable(),
  last_name: z.string().min(1, 'Last name is required').nullable(),
  phone_number: z.string().min(1, 'Phone number is required').nullable(),
  address: z.string().min(1, 'Address is required').nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileCreateForm = () => {
  const { showToast } = useAppToast();

  const { data: profile, isLoading } = useViewProfile();
  const { mutate: editProfile, isPending } = useEditProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: null,
      last_name: null,
      phone_number: null,
      address: null,
    },
  });

  useEffect(() => {
    if (profile?.profile) {
      form.reset({
        first_name: profile.profile.first_name ?? null,
        last_name: profile.profile.last_name ?? null,
        phone_number: profile.profile.phone_number ?? null,
        address: profile.profile.address ?? null,
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    editProfile(
      {
        first_name: data.first_name ?? undefined,
        last_name: data.last_name ?? undefined,
        phone_number: data.phone_number ?? undefined,
        address: data.address ?? undefined,
      },
      {
        onSuccess: () => {
          showToast({
            title: 'Success',
            description: 'Profile updated successfully',
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <Separator />
        <div className="w-full space-y-8">
          <div className="gap-8 md:grid md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-[120px] ml-auto" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Edit Profile"
          description="Update your profile information"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="John"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Doe"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="+1234567890"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="123 Main St"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileCreateForm;
