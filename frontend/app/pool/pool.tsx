'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import {
	ArrowUpIcon,
	CopyIcon,
	ExternalLinkIcon,
	RefreshCwIcon,
} from 'lucide-react';
import AddLiquidity from './addliquidity';
import { useState } from 'react';

// Mock data for the chart
const data = [
	{ name: '3:16 PM', fee: 2 },
	{ name: '5:16 PM', fee: 13 },
	{ name: '7:16 PM', fee: 10 },
	{ name: '9:16 PM', fee: 15 },
	{ name: 'Nov 14', fee: 5 },
	{ name: '3:16 AM', fee: 8 },
	{ name: '5:16 AM', fee: 12 },
	{ name: '7:16 AM', fee: 3 },
	{ name: '9:16 AM', fee: 4 },
	{ name: '11:16 AM', fee: 7 },
	{ name: '1:16 PM', fee: 5 },
];

export default function PoolPage() {
	const Component = () => {
		return (
			<>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							<div className='flex items-center space-x-2'>
								<div className='flex -space-x-1'>
									<img
										src='/usdc.png?height=24&width=24'
										alt='USDC'
										className='w-6 h-6 rounded-full border-2 border-background'
									/>
									<img
										src='/etb.svg?height=24&width=24'
										alt='ETB'
										className='w-6 h-6 rounded-full border-2 border-background'
									/>
								</div>
								<span className='font-bold'>USDC / ETB</span>
								<span className='text-muted-foreground'>0.3%</span>
								<Button variant='ghost' size='sm'>
									<RefreshCwIcon className='h-4 w-4' />
								</Button>
							</div>
						</CardTitle>
						<div className='flex space-x-2'>
							<Button variant='ghost' size='sm'>
								<ExternalLinkIcon className='h-4 w-4' />
							</Button>
							<Button variant='ghost' size='sm'>
								<CopyIcon className='h-4 w-4' />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$143.32K</div>
						<p className='text-xs text-muted-foreground'>Past day</p>
						<div className='h-[200px] mt-4'>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart data={data}>
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Bar dataKey='fee' fill='#8884d8' />
								</BarChart>
							</ResponsiveContainer>
						</div>
						<div className='flex justify-between mt-4'>
							<Button variant='ghost' size='sm'>
								1H
							</Button>
							<Button variant='secondary' size='sm'>
								1D
							</Button>
							<Button variant='ghost' size='sm'>
								1W
							</Button>
							<Button variant='ghost' size='sm'>
								1M
							</Button>
							<Button variant='ghost' size='sm'>
								1Y
							</Button>
						</div>
						<div className='flex justify-between mt-2'>
							<span className='text-sm'>Volume</span>
							<Button variant='ghost' size='sm'>
								<RefreshCwIcon className='h-4 w-4' />
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<Card>
						<CardHeader>
							<CardTitle>Stats</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div>
									<div className='text-sm font-medium'>Pool balances</div>
									<div className='flex items-center mt-1'>
										<div className='w-1/2 bg-blue-500 h-2 rounded-l-full'></div>
										<div className='w-1/2 bg-purple-500 h-2 rounded-r-full'></div>
									</div>
									<div className='flex justify-between mt-1 text-sm'>
										<div>27.4K USDC</div>
										<div>14.2M ETB</div>
									</div>
								</div>
								<div>
									<div className='text-sm font-medium'>TVL</div>
									<div className='flex items-center space-x-2'>
										<span className='text-2xl font-bold'>$72.5K</span>
										<span className='text-green-500 flex items-center'>
											<ArrowUpIcon className='h-4 w-4' />
											1.98%
										</span>
									</div>
								</div>
								<div>
									<div className='text-sm font-medium'>24H fees</div>
									<div className='text-2xl font-bold'>$703</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Links</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-2'>
									<div className='flex -space-x-1'>
										<img
											src='/usdc.png?height=24&width=24'
											alt='USDC'
											className='w-6 h-6 rounded-full border-2 border-background'
										/>
										<img
											src='/etb.svg?height=24&width=24'
											alt='ETB'
											className='w-6 h-6 rounded-full border-2 border-background'
										/>
									</div>
									<span>USDC / ETB</span>
								</div>
								<div className='flex items-center space-x-2'>
									<Button variant='secondary' size='sm'>
										0x8ad5...e6D8
									</Button>
									<Button variant='ghost' size='sm'>
										<CopyIcon className='h-4 w-4' />
									</Button>
									<Button variant='ghost' size='sm'>
										<ExternalLinkIcon className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</>
		);
	};
	const [activeComponent, setActiveComponent] = useState<'one' | 'two'>('one');

	const handleSwap = () => {
		setActiveComponent(activeComponent === 'one' ? 'two' : 'one');
	};
	return (
		<div className='container mx-auto p-4 space-y-6'>
			{activeComponent === 'one' ? (
				<div className='flex justify-between items-center'>
					<div className='flex items-center space-x-2'>
						<h1 className='text-2xl font-bold'>Pool</h1>
						<Button variant='ghost' size='sm'>
							<RefreshCwIcon className='h-4 w-4' />
						</Button>
					</div>
					<Button
						className='bg-pink-500 hover:bg-pink-600 text-white'
						onClick={handleSwap}
					>
						+ Add liquidity
					</Button>
				</div>
			) : (
				<></>
			)}

			<div className='mt-4'>
				{activeComponent === 'one' ? (
					<Component />
				) : (
					<AddLiquidity setActiveComponent={setActiveComponent} />
				)}
			</div>
		</div>
	);
}
