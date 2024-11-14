'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Minus, Plus, Settings } from 'lucide-react';

interface ComponentProps {
	setActiveComponent: (component: 'one' | 'two') => void;
}

const AddLiquidity: React.FC<ComponentProps> = ({ setActiveComponent }) => {
	const handleSwitch = () => {
		setActiveComponent('one');
	};

	const [lowPrice, setLowPrice] = useState('115');
	const [highPrice, setHighPrice] = useState('145');
	const [usdcAmount, setUsdcAmount] = useState('0');
	const [etbAmount, setEtbAmount] = useState('0');

	return (
		<div className='container mx-auto p-4'>
			<Card className='w-full max-w-lg mx-auto'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<Button
						variant='ghost'
						size='sm'
						className='text-primary'
						onClick={handleSwitch}
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back
					</Button>
					<CardTitle className='text-xl font-bold'>Add liquidity</CardTitle>
					<div className='flex items-center space-x-2'>
						<Button
							variant='ghost'
							size='sm'
							className='text-pink-500 hover:text-pink-600'
						>
							Clear all
						</Button>
						<Button variant='ghost' size='sm'>
							<Settings className='h-4 w-4' />
						</Button>
					</div>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div>
						<h3 className='text-sm font-medium mb-2'>Select pair</h3>
						<div className='flex space-x-2'>
							<Select>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select token'>
										<div className='flex items-center'>
											<img
												src='/usdc.png?height=20&width=20'
												alt='USDC'
												className='w-5 h-5 mr-2 rounded-full'
											/>
											USDC
										</div>
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='usdc'>
										<div className='flex items-center'>
											<img
												src='/usdc.png?height=20&width=20'
												alt='USDC'
												className='w-5 h-5 mr-2 rounded-full'
											/>
											USDC
										</div>
									</SelectItem>
									<SelectItem value='eth'>
										<div className='flex items-center'>
											<img
												src='/etb.svg?height=20&width=20'
												alt='ETB'
												className='w-5 h-5 mr-2 rounded-full'
											/>
											ETB
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select token'>
										<div className='flex items-center'>
											<img
												src='/etb.svg?height=20&width=20'
												alt='ETB'
												className='w-5 h-5 mr-2 rounded-full'
											/>
											ETB
										</div>
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='etb'>
										<div className='flex items-center'>
											<img
												src='/etb.svg?height=20&width=20'
												alt='ETB'
												className='w-5 h-5 mr-2 rounded-full'
											/>
											ETB
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='bg-secondary p-4 rounded-md'>
						<div className='flex justify-between items-center'>
							<div>
								<div className='font-medium'>0.30% fee tier</div>
								{/* <div className='text-sm text-muted-foreground'>10% select</div> */}
							</div>
							<Button variant='outline' size='sm'>
								Edit
							</Button>
						</div>
					</div>

					<div>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-sm font-medium'>Set price range</h3>
							<div className='flex items-center space-x-2'>
								<Button variant='outline' size='sm'>
									Full range
								</Button>
								<div className='bg-secondary rounded-full p-1'>
									<Button variant='ghost' size='sm' className='rounded-full'>
										USDC
									</Button>
									<Button
										variant='ghost'
										size='sm'
										className='rounded-full bg-background'
									>
										ETB
									</Button>
								</div>
							</div>
						</div>
						<div className='space-y-4'>
							<div>
								<label className='text-sm text-muted-foreground'>
									Low price
								</label>
								<div className='relative mt-1'>
									<Input
										type='text'
										value={lowPrice}
										onChange={(e) => setLowPrice(e.target.value)}
										className='pr-16 text-left'
									/>
									<div className='absolute inset-y-0 right-0 flex items-center pr-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												setLowPrice((prev) =>
													(parseFloat(prev) + 0.01).toFixed(3)
												)
											}
										>
											<Plus className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												setLowPrice((prev) =>
													Math.max(0, parseFloat(prev) - 0.01).toFixed(3)
												)
											}
										>
											<Minus className='h-4 w-4' />
										</Button>
									</div>
								</div>
								<div className='text-xs text-muted-foreground mt-1'>
									ETB per USDC
								</div>
							</div>
							<div>
								<label className='text-sm text-muted-foreground'>
									High price
								</label>
								<div className='relative mt-1'>
									<Input
										type='text'
										value={highPrice}
										onChange={(e) => setHighPrice(e.target.value)}
										className='pr-16 text-left'
									/>
									<div className='absolute inset-y-0 right-0 flex items-center pr-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												setHighPrice((prev) =>
													(parseFloat(prev) + 0.01).toFixed(3)
												)
											}
										>
											<Plus className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												setHighPrice((prev) =>
													Math.max(0, parseFloat(prev) - 0.01).toFixed(3)
												)
											}
										>
											<Minus className='h-4 w-4' />
										</Button>
									</div>
								</div>
								<div className='text-xs text-muted-foreground mt-1'>
									ETB per USDC
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 className='text-sm font-medium mb-4'>Deposit amounts</h3>
						<div className='space-y-4'>
							<div className='bg-secondary p-4 rounded-lg'>
								<div className='flex justify-between items-center mb-1'>
									<Input
										type='text'
										value={usdcAmount}
										onChange={(e) => {
											setUsdcAmount(e.target.value);
											setEtbAmount((parseFloat(usdcAmount) * 122.5).toFixed(2));
										}}
										className='text-2xl font-bold bg-transparent border-none outline-none focus:border-transparent focus:ring-0 p-0 w-1/2'
									/>
									<div className='flex items-center'>
										<img
											src='/usdc.png?height=24&width=24'
											alt='USDC'
											className='w-6 h-6 mr-2 rounded-full'
										/>
										<span className='font-bold'>USDC</span>
									</div>
								</div>
								<div className='flex justify-between items-center text-sm'>
									<span className='text-muted-foreground'>
										${parseFloat(usdcAmount).toFixed(2)}
									</span>
									<span className='text-muted-foreground'>
										Balance: 0{' '}
										<Button
											variant='link'
											size='sm'
											className='text-primary p-0'
										>
											MAX
										</Button>
									</span>
								</div>
							</div>
							<div className='bg-secondary p-4 rounded-lg'>
								<div className='flex justify-between items-center mb-1'>
									<Input
										type='text'
										value={etbAmount}
										onChange={(e) => setEtbAmount(e.target.value)}
										className='text-2xl font-bold bg-transparent border-none outline-none focus:border-transparent focus:ring-0 p-0 w-1/2'
									/>
									<div className='flex items-center'>
										<img
											src='/etb.svg?height=24&width=24'
											alt='ETB'
											className='w-6 h-6 mr-2 rounded-full'
										/>
										<span className='font-bold'>ETB</span>
									</div>
								</div>
								<div className='flex justify-between items-center text-sm'>
									<span className='text-muted-foreground'>
										${(parseFloat(etbAmount) * 0.008163).toFixed(2)}
									</span>
									<span className='text-muted-foreground'>
										Balance: 0{' '}
										<Button
											variant='link'
											size='sm'
											className='text-primary p-0'
										>
											MAX
										</Button>
									</span>
								</div>
							</div>
						</div>
						<div>
							{parseFloat(usdcAmount) > 0 ? (
								<div className='mt-4 p-4 bg-red-100 text-red-800 rounded-md text-center'>
									Insufficient USDC balance
								</div>
							) : (
								<div className='mt-4 p-4 bg-gray-200 text-gray-500 rounded-md text-center'>
									Enter amount
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddLiquidity;
