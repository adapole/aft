'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, CreditCard, User } from 'lucide-react';

export default function NavBar() {
	return (
		<div className='flex items-center gap-2'>
			<Button variant='ghost' size='icon'>
				<Bell className='h-5 w-5' />
				<span className='sr-only'>Notifications</span>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
						<User className='h-6 w-6' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56' align='end' forceMount>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>John Doe</p>
							<p className='text-xs leading-none text-muted-foreground'>
								john@example.com
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className='mr-2 h-4 w-4' />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
