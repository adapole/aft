'use client';

import { Bell } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
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
import SideBar from '../sidebar';
import NavBar from '../navbar';
// import SendMoney from '../send-money';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '@particle-network/connectkit';

// const exchangeRateData = [
// 	{ date: '7 Oct', rate: 0.911 },
// 	{ date: '', rate: 0.915 },
// 	{ date: '', rate: 0.922 },
// 	{ date: '', rate: 0.919 },
// 	{ date: '', rate: 0.921 },
// 	{ date: '', rate: 0.918 },
// 	{ date: '', rate: 0.923 },
// 	{ date: 'Today', rate: 0.934 },
// ];

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
	const [amount, setAmount] = React.useState('1000.00');
	const currentRate = 0.9343;

	const convertedAmount = (parseFloat(amount) * currentRate).toFixed(2);
	const fees = '3.40';
	const { isConnected } = useAccount();

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='flex h-16 items-center justify-between border-b bg-white px-4'>
				<SideBar />
				<NavBar />
			</header>
			<main className='p-4'>
				<div className='container mx-auto px-4'>
					<div className='mb-6'>
						<div className='mb-1 text-sm text-gray-500'>Total balance</div>
						<div className='flex items-center gap-2'>
							{isConnected ? (
								<>
									<h1 className='text-3xl font-bold'>87,658.79 USD</h1>
								</>
							) : (
								<>
									<Skeleton className='h-10 w-48' />
									{/* <Skeleton className='h-8 w-8 rounded-full' /> */}
								</>
							)}
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
						{/* <SendMoney /> */}
						<Button variant='outline'>Add Money</Button>
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
								{isConnected ? (
									<div className='text-2xl font-bold'>725.07</div>
								) : (
									<Skeleton className='h-8 w-24' />
								)}
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
								{isConnected ? (
									<>
										<div className='text-2xl font-bold'>725.07</div>
										<div className='text-sm text-gray-500'>↗ 3.3782</div>
									</>
								) : (
									<>
										<Skeleton className='h-8 w-24' />
										<Skeleton className='mt-1 h-4 w-16' />
									</>
								)}
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
										<div className='relative h-auto w-full'>
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
					<div className='mt-8'>
						<div className='mb-4 flex items-center justify-between'>
							<h2 className='text-xl font-bold'>Recent Recipients</h2>
						</div>
						<Card>
							<CardHeader>
								<CardTitle>Recipients</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{['Alice Johnson', 'Bob Smith', 'Charlie Brown'].map(
										(name) => (
											<div
												key={name}
												className='flex items-center justify-between'
											>
												<div className='flex items-center space-x-4'>
													<div className='h-10 w-10 rounded-full bg-gray-200' />
													{isConnected ? (
														<div>
															<p className='text-sm font-medium leading-none'>
																{name}
															</p>
															<p className='text-sm text-gray-500'>
																Last sent: 2 weeks ago
															</p>
														</div>
													) : (
														<Skeleton className='h-10 w-48' />
													)}
												</div>
												{isConnected ? (
													<Button variant='outline'>Send Again</Button>
												) : (
													<Skeleton className='h-8 w-24' />
												)}
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
