'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SideBar from '../sidebar';
import NavBar from '../navbar';

export default function RemittanceApp() {
	// const [amount, setAmount] = React.useState('1000');
	// const [exchangeRate, setExchangeRate] = React.useState(0.85);
	// const [fee, setFee] = React.useState(4.99);

	// const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setAmount(e.target.value);
	// };

	return (
		<div className='flex min-h-screen flex-col bg-gray-100'>
			<header className='flex h-16 items-center justify-between border-b bg-white px-4'>
				<SideBar />
				<NavBar />
			</header>
			<main className='flex-1 py-8'>
				<div className='container mx-auto px-4'>
					<Tabs defaultValue='send' className='space-y-4'>
						<TabsList>
							<TabsTrigger value='send'>Recipients</TabsTrigger>
							<TabsTrigger value='activity'>Activity</TabsTrigger>
						</TabsList>
						<TabsContent value='send' className='space-y-4'>
							{/* <Card>
								<CardHeader>
									<CardTitle>Send Money Internationally</CardTitle>
									<CardDescription>
										Transfer funds to your loved ones abroad quickly and
										securely.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form>
										<div className='grid gap-4'>
											<div className='grid grid-cols-2 gap-4'>
												<div className='space-y-2'>
													<label
														htmlFor='amount'
														className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
													>
														You send
													</label>
													<div className='flex'>
														<Input
															id='amount'
															placeholder='1000'
															value={amount}
															onChange={handleAmountChange}
															className='rounded-r-none'
														/>
														<Select defaultValue='USD'>
															<SelectTrigger className='w-[80px] rounded-l-none'>
																<SelectValue placeholder='USD' />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='USD'>USD</SelectItem>
																<SelectItem value='EUR'>EUR</SelectItem>
																<SelectItem value='GBP'>GBP</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
												<div className='space-y-2'>
													<label
														htmlFor='receive'
														className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
													>
														They receive
													</label>
													<div className='flex'>
														<Input
															id='receive'
															placeholder='850'
															value={(
																parseFloat(amount) * exchangeRate
															).toFixed(2)}
															readOnly
															className='rounded-r-none'
														/>
														<Select defaultValue='EUR'>
															<SelectTrigger className='w-[80px] rounded-l-none'>
																<SelectValue placeholder='EUR' />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='EUR'>EUR</SelectItem>
																<SelectItem value='GBP'>GBP</SelectItem>
																<SelectItem value='INR'>INR</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
											</div>
											<div>
												<label
													htmlFor='recipient'
													className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
												>
													Recipient
												</label>
												<Select>
													<SelectTrigger id='recipient'>
														<SelectValue placeholder='Select recipient' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='alice'>Alice Johnson</SelectItem>
														<SelectItem value='bob'>Bob Smith</SelectItem>
														<SelectItem value='charlie'>
															Charlie Brown
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div>
												<label
													htmlFor='paymentMethod'
													className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
												>
													Payment Method
												</label>
												<Select defaultValue='debit'>
													<SelectTrigger id='paymentMethod'>
														<SelectValue placeholder='Select payment method' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='debit'>Debit Card</SelectItem>
														<SelectItem value='credit'>Credit Card</SelectItem>
														<SelectItem value='bank'>Bank Transfer</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</form>
								</CardContent>
								<CardFooter className='flex justify-between'>
									<div className='text-sm text-gray-500'>
										Fee: ${fee.toFixed(2)} • Exchange Rate: 1 USD ={' '}
										{exchangeRate} EUR
									</div>
									<Button>Send {amount} USD</Button>
								</CardFooter>
							</Card> */}
							<Card>
								<CardHeader>
									<CardTitle>Recent Recipients</CardTitle>
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
														<div>
															<p className='text-sm font-medium leading-none'>
																{name}
															</p>
															<p className='text-sm text-gray-500'>
																Last sent: 2 weeks ago
															</p>
														</div>
													</div>
													<Button variant='outline'>Send Again</Button>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='activity' className='space-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>Transaction History</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{[
											{
												name: 'Alice Johnson',
												amount: '500.00',
												currency: 'EUR',
												date: '2023-06-15',
											},
											{
												name: 'Bob Smith',
												amount: '750.00',
												currency: 'GBP',
												date: '2023-06-10',
											},
											{
												name: 'Charlie Brown',
												amount: '1000.00',
												currency: 'USD',
												date: '2023-06-05',
											},
										].map((transaction, index) => (
											<div
												key={index}
												className='flex items-center justify-between'
											>
												<div className='flex items-center space-x-4'>
													<div className='h-10 w-10 rounded-full bg-gray-200' />
													<div>
														<p className='text-sm font-medium leading-none'>
															{transaction.name}
														</p>
														<p className='text-sm text-gray-500'>
															Sent on {transaction.date}
														</p>
													</div>
												</div>
												<div className='text-right'>
													<p className='text-sm font-medium leading-none'>
														{transaction.amount} {transaction.currency}
													</p>
													<p className='text-sm text-gray-500'>Completed</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</div>
	);
}
