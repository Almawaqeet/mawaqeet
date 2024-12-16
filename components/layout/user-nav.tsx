'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import { extractInitials } from '@/lib/utils';
import { ACCOUNT_TYPES } from '@/constants/generic';

export function UserNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className="relative h-8 w-8 rounded-full text-white">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage
              src={session.user?.image ?? ''}
              alt={session.user?.name ?? ''}
            /> */}
            <AvatarFallback>
              {extractInitials(session?.user?.email ?? '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.fullName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {session?.user.accountType === ACCOUNT_TYPES.USER && <DropdownMenuItem>
            Wallet
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>}
          {session?.user.accountType === ACCOUNT_TYPES.ADMIN && <DropdownMenuItem>Team
          <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
          </DropdownMenuItem>}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
