'use client';

import { Gift, Home, Menu, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import * as React from 'react';

export default function SideBar() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Menu className='h-5 w-5' />
					<span className='sr-only'>Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='w-[300px] p-0'>
				<SheetHeader className='border-b p-4'>
					<SheetTitle>
						<div className='flex items-center gap-2'>
							<svg
								aria-label='Vercel logomark'
								height='22'
								role='img'
								viewBox='0 0 74 64'
							>
								<path
									d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
									fill='var(--geist-foreground)'
								></path>
							</svg>
						</div>
					</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col gap-1 p-2'>
					<Button
						variant='ghost'
						className='justify-start gap-2'
						onClick={() => setOpen(false)}
					>
						<Home className='h-4 w-4' />
						<Link href='/'>Home</Link>
					</Button>
					<Button
						variant='ghost'
						className='justify-start gap-2'
						onClick={() => setOpen(false)}
					>
						<Users className='h-4 w-4' />
						<Link href='/recipients'>Recipients</Link>
					</Button>
					<Button
						variant='ghost'
						className='justify-start gap-2'
						onClick={() => setOpen(false)}
					>
						<svg
							className='h-4 w-4'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
						>
							<path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
						</svg>
						<Link href='/zelle'>Zelle</Link>
					</Button>
					<Button
						variant='ghost'
						className='justify-start gap-2'
						onClick={() => setOpen(false)}
					>
						<Gift className='h-4 w-4' />
						<Link href='/'>PMM</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
