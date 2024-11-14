'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownIcon, ChevronDownIcon, Settings2Icon } from 'lucide-react';

export default function Convert() {
	const [sellAmount, setSellAmount] = useState('0');
	const [buyAmount, setBuyAmount] = useState('0');
	// const [selectedToken, setSelectedToken] = useState('USDC');

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardContent className='p-6'>
				<div className='flex justify-between items-center mb-6'>
					<Tabs defaultValue='swap' className='w-full'>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger
								value='swap'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Swap
							</TabsTrigger>
							<TabsTrigger value='limit'>Limit</TabsTrigger>
							<TabsTrigger value='send'>Send</TabsTrigger>
							<TabsTrigger value='buy'>Buy</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button variant='ghost' size='icon' className='ml-2'>
						<Settings2Icon className='h-4 w-4' />
					</Button>
				</div>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<div className='text-sm font-medium'>Sell</div>
						<div className='flex items-center space-x-2'>
							<Input
								type='number'
								value={sellAmount}
								onChange={(e) => setSellAmount(e.target.value)}
								className='text-2xl'
								placeholder='0'
							/>
							<Button variant='outline' className='flex items-center space-x-1'>
								<img
									src='/placeholder.svg'
									alt='USDC'
									className='w-5 h-5 rounded-full'
								/>
								<span>USDC</span>
								<ChevronDownIcon className='h-4 w-4' />
							</Button>
						</div>
						<div className='text-sm text-muted-foreground'>$0</div>
					</div>
					<div className='flex justify-center'>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<ArrowDownIcon className='h-4 w-4' />
						</Button>
					</div>
					<div className='space-y-2'>
						<div className='text-sm font-medium'>Buy</div>
						<div className='flex items-center space-x-2'>
							<Input
								type='number'
								value={buyAmount}
								onChange={(e) => setBuyAmount(e.target.value)}
								className='text-2xl'
								placeholder='0'
							/>
							<Button
								variant='outline'
								className='flex items-center space-x-1 bg-pink-500 text-white hover:bg-pink-600'
							>
								<span>Select token</span>
								<ChevronDownIcon className='h-4 w-4' />
							</Button>
						</div>
					</div>
					<Button
						className='w-full bg-gray-100 text-gray-600 hover:bg-gray-200'
						disabled
					>
						Select a token
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
