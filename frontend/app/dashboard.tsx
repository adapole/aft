'use client';

import { Bell, CreditCard, Gift, Home, Menu, Users, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

// This would typically come from your API
const exchangeRateData = [
	{ date: '7 Oct', rate: 0.911 },
	{ date: '', rate: 0.915 },
	{ date: '', rate: 0.922 },
	{ date: '', rate: 0.919 },
	{ date: '', rate: 0.921 },
	{ date: '', rate: 0.918 },
	{ date: '', rate: 0.923 },
	{ date: 'Today', rate: 0.934 },
];

const chartData = [
	{ date: '7 Oct', rate: 0.911 },
	{ date: '8 Oct', rate: 0.915 },
	{ date: '15 Oct', rate: 0.919 },
	{ date: '18 Oct', rate: 0.922 },
	{ date: '20 Oct', rate: 0.921 },
	{ date: '2 Nov', rate: 0.918 },
	{ date: 'Today', rate: 0.934 },
];

const chartConfig = {
	rate: {
		label: 'Rate',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function Component() {
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = React.useState('1000.00');
	const currentRate = 0.9343;

	const convertedAmount = (parseFloat(amount) * currentRate).toFixed(2);
	const fees = '3.40';

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='flex h-16 items-center justify-between border-b bg-white px-4'>
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
								<svg
									className='h-6'
									viewBox='0 0 100 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M0 11.5c0 6.35 5.15 11.5 11.5 11.5s11.5-5.15 11.5-11.5S17.85 0 11.5 0 0 5.15 0 11.5z'
										fill='#00B9FF'
									/>
									<path
										d='M45.5 11.5c0 6.35 5.15 11.5 11.5 11.5s11.5-5.15 11.5-11.5S63.35 0 57 0s-11.5 5.15-11.5 11.5z'
										fill='#00B9FF'
									/>
									<path
										d='M91 0H77.5v23h4.75V13.8h8.5c4.77 0 8.25-3.34 8.25-7.67C99 2.23 95.52 0 91 0z'
										fill='#00B9FF'
									/>
								</svg>
							</SheetTitle>
						</SheetHeader>
						<div className='flex flex-col gap-1 p-2'>
							<Button
								variant='ghost'
								className='justify-start gap-2'
								onClick={() => setOpen(false)}
							>
								<Home className='h-4 w-4' />
								Home
							</Button>
							{/* <Button
								variant='ghost'
								className='justify-start gap-2'
								onClick={() => setOpen(false)}
							>
								<CreditCard className='h-4 w-4' />
								Card
							</Button> */}
							<Button
								variant='ghost'
								className='justify-start gap-2'
								onClick={() => setOpen(false)}
							>
								<Users className='h-4 w-4' />
								Recipients
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
								Zelle
							</Button>
							<Button
								variant='ghost'
								className='justify-start gap-2'
								onClick={() => setOpen(false)}
							>
								<Gift className='h-4 w-4' />
								PMM
							</Button>
						</div>
					</SheetContent>
				</Sheet>
				<div className='flex items-center gap-2'>
					<Button variant='ghost' size='icon'>
						<Bell className='h-5 w-5' />
						<span className='sr-only'>Notifications</span>
					</Button>
					<Button variant='ghost' className='gap-2'>
						EB
					</Button>
				</div>
			</header>
			<main className='p-4'>
				<div className='mb-6'>
					<div className='mb-1 text-sm text-gray-500'>Total balance</div>
					<div className='flex items-center gap-2'>
						<h1 className='text-3xl font-bold'>87,658.79 USD</h1>
						<Button variant='ghost' size='icon' className='rounded-full'>
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
						</Button>
					</div>
				</div>
				<div className='mb-6 flex gap-2'>
					<Button className='bg-[#2ED06E] text-white hover:bg-[#2ED06E]/90'>
						Send
					</Button>
					<Button variant='outline'>Add money</Button>
					<Button variant='outline'>Request</Button>
				</div>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					<Card>
						<CardContent className='p-4'>
							<div className='mb-4 flex items-center gap-2'>
								<div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border'>
									<span className='text-xs'>🇺🇸</span>
								</div>
								<div className='font-medium'>USD</div>
							</div>
							<div className='text-2xl font-bold'>725.07</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-4'>
							<div className='mb-4 flex items-center gap-2'>
								<div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border'>
									<span className='text-xs'>🇪🇺</span>
								</div>
								<div className='font-medium'>ETB</div>
							</div>
							<div className='mb-1 text-2xl font-bold'>0.00</div>
							<div className='text-sm text-gray-500'>↗ 3.3782</div>
						</CardContent>
					</Card>
					<Card className='border-dashed'>
						<CardContent className='flex items-center justify-center p-4'>
							<Button variant='ghost' className='h-auto py-8 text-gray-500'>
								Add another currency to your account
							</Button>
						</CardContent>
					</Card>
				</div>
				<div className='mt-8'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-xl font-bold'>Transactions</h2>
						<Button variant='link' className='text-[#2ED06E]'>
							See all
						</Button>
					</div>
					<Card className='mt-6'>
						<CardHeader>
							<CardTitle>Transfer calculator</CardTitle>
							<CardDescription>1 USD = {currentRate} ETB</CardDescription>
						</CardHeader>
						<CardContent className='p-6'>
							{/* <h3 className='mb-4 text-xl font-bold'>Transfer calculator</h3>
							<div className='mb-4 text-sm'>1 USD = {currentRate} ETB</div> */}
							<div className='grid gap-6 md:grid-cols-2'>
								<div>
									<div className='relative h-[200px] w-full'>
										<ChartContainer config={chartConfig}>
											<AreaChart
												accessibilityLayer
												data={chartData}
												margin={{
													left: 12,
													right: 12,
												}}
											>
												<CartesianGrid vertical={false} />
												<XAxis
													dataKey='date'
													tickLine={false}
													axisLine={false}
													tickMargin={8}
													tickFormatter={(value) => value.slice(0, 3)}
												/>
												<ChartTooltip
													cursor={false}
													content={
														<ChartTooltipContent indicator='dot' hideLabel />
													}
												/>
												<Area
													dataKey='rate'
													type='linear'
													fill='var(--color-rate)'
													fillOpacity={0.4}
													stroke='var(--color-rate)'
												/>
											</AreaChart>
										</ChartContainer>
									</div>
								</div>
								<div className='space-y-4'>
									<div className='space-y-2'>
										<div className='flex items-center gap-2 rounded-lg border bg-white p-3'>
											<input
												type='text'
												value={amount}
												onChange={(e) => setAmount(e.target.value)}
												className='flex-1 bg-transparent outline-none'
											/>
											<Select defaultValue='USD'>
												<SelectTrigger className='w-[100px] border-0 bg-transparent p-0 focus:ring-0'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='USD'>
														<span className='mr-2'>🇺🇸</span>
														USD
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className='flex items-center gap-2 rounded-lg border bg-white p-3'>
											<input
												type='text'
												value={convertedAmount}
												readOnly
												className='flex-1 bg-transparent outline-none'
											/>
											<Select defaultValue='ETB'>
												<SelectTrigger className='w-[100px] border-0 bg-transparent p-0 focus:ring-0'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='ETB'>
														<span className='mr-2'>🇪🇺</span>
														ETB
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className='rounded-lg bg-gray-50 p-3 text-center text-sm'>
										Includes fees {fees} USD
									</div>
									<Button className='w-full bg-[#2ED06E] text-white hover:bg-[#2ED06E]/90'>
										Send
									</Button>
								</div>
							</div>
							<Button variant='ghost' className='mt-4 w-full gap-2'>
								<Bell className='h-4 w-4' />
								Get exchange rate updates
							</Button>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
