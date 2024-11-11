'use client';

// import { User, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function AddMoneyModal() {
	const [amount, setAmount] = React.useState('1,000');
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Add Money</Button>
			</DialogTrigger>
			<DialogContent className='max-w-4xl p-0'>
				<div className='flex h-screen flex-col'>
					<DialogHeader className='flex h-16 flex-row items-center justify-center border-b px-4'>
						<div className='flex items-center gap-12'>
							<div className='flex items-center gap-8'>
								<div className='flex items-center gap-2'>
									<div className='h-2 w-2 rounded-full bg-[#2ED06E]' />
									<span className='text-sm font-medium'>Amount</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='h-2 w-2 rounded-full bg-gray-300' />
									<span className='text-sm text-gray-600'>Verification</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='h-2 w-2 rounded-full bg-gray-300' />
									<span className='text-sm text-gray-600'>Payment</span>
								</div>
							</div>
						</div>
					</DialogHeader>
					<div className='flex-1 overflow-auto'>
						<div className='mx-auto max-w-xl px-4 py-8'>
							<DialogTitle className='mb-8 text-center text-2xl font-semibold'>
								Add money
							</DialogTitle>
							<div className='space-y-6'>
								<div>
									<label className='mb-2 block text-sm' htmlFor='amount'>
										Amount to add to Wise
									</label>
									<div className='flex rounded-lg border'>
										<input
											className='flex-1 px-3 py-2 outline-none'
											id='amount'
											type='text'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
										/>
										<Select defaultValue='USD'>
											<SelectTrigger className='w-[100px] border-0 border-l'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='USD'>
													<div className='flex items-center gap-2'>
														<span className='text-base'>🇺🇸</span>
														USD
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div>
									<div className='mb-2 text-sm'>Paying with</div>
									<button className='flex w-full items-center justify-between rounded-lg bg-gray-50 p-4'>
										<div className='flex items-center gap-3'>
											<div className='flex h-8 w-8 items-center justify-center rounded-full border bg-white'>
												<svg
													className='h-4 w-4'
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													viewBox='0 0 24 24'
												>
													<path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z' />
													<path d='M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4' />
												</svg>
											</div>
											<div className='text-left'>
												<div className='font-medium'>Chase Bank</div>
												<div className='text-sm text-gray-600'>
													USD Checking *010
												</div>
											</div>
										</div>
										<span className='text-sm font-medium text-[#2ED06E]'>
											Change
										</span>
									</button>
								</div>
								<div className='rounded-lg border p-4'>
									<div className='mb-4 flex items-center justify-between text-sm'>
										<span>Currency to pay in</span>
										<button className='flex items-center gap-1 font-medium'>
											US dollar
											<svg
												className='h-4 w-4'
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												viewBox='0 0 24 24'
											>
												<path d='m6 9 6 6 6-6' />
											</svg>
										</button>
									</div>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span>ACH fee</span>
											<span>2.50 USD</span>
										</div>
										<div className='flex justify-between'>
											<span>Our fee</span>
											<span>0 USD</span>
										</div>
										<div className='flex justify-between border-t pt-2'>
											<span>Total fees</span>
											<span>2.50 USD</span>
										</div>
									</div>
								</div>
								<div className='flex justify-between border-t py-4 text-sm'>
									<span>Total you&apos;ll pay</span>
									<span className='font-medium'>1,002.50 USD</span>
								</div>
								<Button className='w-full bg-[#2ED06E] py-6 text-base font-medium hover:bg-[#2ED06E]/90'>
									Pay 1,002.50 USD
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
