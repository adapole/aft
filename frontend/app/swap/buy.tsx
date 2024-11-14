'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowDownIcon, ChevronDownIcon, ArrowRight, Copy } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { QRCodeSVG } from 'qrcode.react';

// Particle imports
import {
	// useAccount,
	// useParticleAuth,
	useWallets,
} from '@particle-network/connectkit';

import { ethers } from 'ethers';

// const useStateAsync = (initialState: any) => {
// 	const [state, setState] = useState(initialState);

// 	const setStateAsync = (newState: (arg0: any) => any) => {
// 		return new Promise((resolve) => {
// 			setState((prevState: any) => {
// 				const updatedState =
// 					typeof newState === 'function' ? newState(prevState) : newState;
// 				resolve(updatedState);
// 				return updatedState;
// 			});
// 		});
// 	};

// 	return [state, setStateAsync];
// };

/* eslint-disable */
const UsdToUSDC = ({ usd, etb }: any) => {
	/* eslint-enable */

	return (
		<div className='space-y-1'>
			<div className='text-sm text-muted-foreground text-right'>
				1 USDC = 122.5 ETB
			</div>
			<span className='text-sm font-medium'>Routes</span>
			<div>
				{[
					{
						from: 'USD',
						to: 'USDC',
						initial: parseFloat(usd).toFixed(3),
						converted: (parseFloat(usd) * 0.995).toFixed(3),
						remaining: (usd - usd * 0.995).toFixed(3) + ' USDC',
					},
					{
						from: 'USDC',
						to: 'ETB',
						initial: (parseFloat(usd) * 0.995).toFixed(3),
						converted: (parseFloat(usd) * 0.995 * etb).toFixed(3),
						remaining: ((usd - usd * 0.995) * 20).toFixed(3) + ' ETB',
					},
					{
						from: 'ETB',
						to: 'Bank',
						initial: (parseFloat(usd) * 0.995 * etb).toFixed(3),
						converted: (parseFloat(usd) * 0.995 * etb).toFixed(3),
						remaining: '0 ETB',
					},
				].map((row, index) => (
					<div
						key={index}
						className='grid grid-cols-3 gap-3 items-center text-sm text-muted-foreground'
					>
						<div className='flex items-center space-x-2'>
							<span>{row.from}</span>
							<ArrowRight className='h-4 w-4' />
							<span>{row.to}</span>
						</div>
						<div className='flex items-center justify-between space-x-2'>
							<span>{row.initial}</span>
							<ArrowRight className='h-4 w-4' />
							<span>{row.converted}</span>
						</div>
						<div className='text-right'>{row.remaining}</div>
					</div>
				))}
			</div>
		</div>
	);
};

/* eslint-disable */
const ZelleDeposit = ({ name }: any) => {
	/* eslint-enable */
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full bg-[#2ED06E]/90 hover:bg-[#2ED06E] text-white'>
					{name}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>
						Deposit to &quot;remittance@aft.finance&quot;
					</DialogTitle>
					<DialogDescription>
						Add the following code to reference when sending.
					</DialogDescription>
				</DialogHeader>
				<div className='flex justify-center items-center'>
					<QRCodeSVG value={'AFT-20241115-123456'} size={150} level='H' />
				</div>

				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='link' className='sr-only'>
							Link
						</Label>
						<Input id='link' defaultValue='AFT-20241115-123456' readOnly />
					</div>
					<Button type='submit' size='sm' className='px-3'>
						<span className='sr-only'>Copy</span>
						<Copy />
					</Button>
				</div>
				{/* <DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
};
export default function CryptoSwap() {
	// Initialize account-related states from Particle's useAccount hook
	// const { address, isConnected, isConnecting, isDisconnected, chainId } =
	// 	useAccount();
	// Retrieve the primary wallet from the Particle Wallets
	const [primaryWallet] = useWallets();

	/* eslint-disable */
	const signWalletMessage = async (tx: any) => {
		/* eslint-enable */
		// Send transaction using ethers.js with a custom EIP-1193 provider
		try {
			const EOAprovider = await primaryWallet.connector.getProvider();
			const customProvider = new ethers.BrowserProvider(
				EOAprovider as ethers.Eip1193Provider,
				'any'
			);

			const signer = await customProvider.getSigner();
			const txResponse = await signer.signMessage(tx);
			const txReceipt = await txResponse;

			if (txReceipt) {
				// setTransactionHash(txReceipt.hash);
				console.log('Signed message');
			} else {
				console.error('Transaction receipt is null');
			}
		} catch (error) {
			console.error('Error executing EVM transaction:', error);
		}
	};

	const [sellAmount, setSellAmount] = useState('0');
	const [buyAmount, setBuyAmount] = useState('0');
	/* eslint-disable */
	function setStateAsync(state: any) {
		return new Promise((resolve: any) => {
			setBuyAmount(state), resolve;
		});
	}
	/* eslint-enable */
	const [amountUSD, setAmountUSD] = useState('0');
	const [buyValue, setBuyValue] = useState('0');
	const [buyToken, setBuyToken] = useState('USDC');
	const [selectedValue, setSelectedValue] = useState('');
	const [selectedSend, setSelectedSend] = useState('');
	const [recipient, setRecipient] = useState('');

	const [withdrawAmount, setWithdrawAmount] = useState('0');
	const [withdrawSelected, setWithdrawSelected] = useState('');

	const handleBuyValueChange = (value: string) => {
		setBuyValue(value);
		const wbtcAmount = (parseFloat(value) * 0.999).toFixed(4);
		setBuyToken(`${wbtcAmount} USDC`);
	};

	useEffect(() => {
		if (withdrawSelected == 'usdc') setSelectedSend('usdc');
		if (withdrawSelected == 'etb') setSelectedSend('cbe');

		return () => {};
	}, [withdrawSelected]);

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardContent className='p-6'>
				<div className='flex justify-between items-center mb-6'>
					<Tabs defaultValue='add' className='w-full'>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger
								value='send'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Send
							</TabsTrigger>
							<TabsTrigger
								value='convert'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Convert
							</TabsTrigger>
							<TabsTrigger
								value='add'
								className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
							>
								Add
							</TabsTrigger>
							<TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
						</TabsList>
						<TabsContent value='send'>
							<div className='space-y-4'>
								<div className='space-y-2'>
									{/* <div className='text-sm font-medium'>Sell</div> */}
									<div className='flex items-center mt-4 space-x-2'>
										<Input
											type='number'
											value={amountUSD}
											onChange={(e) => setAmountUSD(e.target.value)}
											className='text-2xl'
											placeholder='0'
										/>
										<Button
											variant='outline'
											className='flex items-center space-x-1'
										>
											<img
												src='/usd.svg'
												alt='USD'
												className='w-5 h-5 rounded-full'
											/>
											<span>USD</span>
											<ChevronDownIcon className='h-4 w-4' />
										</Button>
									</div>
								</div>

								<div className='space-y-4'>
									<div className='flex items-center space-x-2'>
										<Input
											type='text'
											value={recipient}
											onChange={(e) => setRecipient(e.target.value)}
											className='text-2xl'
											placeholder='Address'
										/>
										<Select
											value={selectedSend}
											onValueChange={(value) => setSelectedSend(value)}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue
													placeholder='Select type'
													className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Onchain</SelectLabel>
													<SelectItem value='usdc'>
														<div className='flex space-x-2'>
															<img
																src='/usdc.png'
																alt='USDC'
																className='w-5 h-5 rounded-full'
															/>
															<span>USDC</span>
														</div>
													</SelectItem>
												</SelectGroup>
												<SelectGroup>
													<SelectLabel>Banks</SelectLabel>
													<SelectItem value='cbe'>
														<div className='flex space-x-2'>
															<img
																src='/cbe.png'
																alt='awash'
																className='w-5 h-5 rounded-full'
															/>
															<span>CBE</span>
														</div>
													</SelectItem>
													<SelectItem value='aws'>
														<div className='flex space-x-2'>
															<img
																src='/awash.png'
																alt='awash'
																className='w-5 h-5 rounded-full'
															/>
															<span>Awash</span>
														</div>
													</SelectItem>
													<SelectItem value='tele'>
														<div className='flex space-x-2'>
															<img
																src='/tele.jpg'
																alt='telebirr'
																className='w-5 h-5 rounded-full'
															/>
															<span>TeleBirr</span>
														</div>
													</SelectItem>
													<SelectItem value='boa'>
														<div className='flex space-x-2'>
															<img
																src='/abyssina.png'
																alt='boa'
																className='w-5 h-5 rounded-full'
															/>
															<span>BOA</span>
														</div>
													</SelectItem>
													<SelectItem value='oib'>
														<div className='flex space-x-2'>
															<img
																src='/oromiya.png'
																alt='boa'
																className='w-5 h-5 rounded-full'
															/>
															<span>COOP</span>
														</div>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{/* <Button
											variant='outline'
											className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
										>
											<span>Select token</span>
											<ChevronDownIcon className='h-4 w-4' />
										</Button> */}
									</div>
								</div>
								{selectedSend == 'usdc' ? (
									<>
										<div className='space-y-1'>
											<span className='text-sm font-medium'>Routes</span>
											<div className='space-x-4 flex'>
												<div className='text-sm text-muted-foreground flex items-center space-x-2'>
													USD <ArrowRight className='h-4 w-4' />
													<span className='text-right'>USDC</span>
												</div>
												<div className='text-sm text-muted-foreground flex items-center space-x-2'>
													{parseFloat(amountUSD).toFixed(3)}{' '}
													<ArrowRight className='h-4 w-4' />{' '}
													{(parseFloat(amountUSD) * 0.995).toFixed(3)}
												</div>
												<div className='text-sm text-muted-foreground flex items-center'>
													{(
														Number(amountUSD) -
														Number(amountUSD) * 0.995
													).toFixed(3)}{' '}
													USDC
												</div>
											</div>
										</div>
										<ZelleDeposit name={'Send'} />
									</>
								) : selectedSend == 'cbe' ? (
									<>
										<UsdToUSDC usd={amountUSD} etb={122.5} />
										<div className='text-sm text-muted-foreground text-left'>
											Bank fee: 2 ETB
										</div>
										<ZelleDeposit name={'Send'} />
									</>
								) : selectedSend == 'aws' ? (
									<>
										<UsdToUSDC usd={amountUSD} etb={122.5} />
										<ZelleDeposit name={'Send'} />
									</>
								) : selectedSend == 'tele' ? (
									<>
										<UsdToUSDC usd={amountUSD} etb={122.5} />
										<ZelleDeposit name={'Send'} />
									</>
								) : selectedSend == 'boa' ? (
									<>
										<UsdToUSDC usd={amountUSD} etb={122.5} />
										<ZelleDeposit name={'Send'} />
									</>
								) : (
									<>
										<Button
											className='w-full bg-gray-100 text-gray-600 hover:bg-gray-200'
											disabled
										>
											Select a recipient
										</Button>
									</>
								)}
							</div>
						</TabsContent>
						<TabsContent value='convert'>
							{/* Existing swap content */}
							<div className='space-y-4'>
								<div className='space-y-2'>
									<div className='text-sm font-medium'>From</div>
									<div className='flex items-center space-x-2'>
										<Input
											type='number'
											value={sellAmount}
											onChange={async (e) => {
												setSellAmount(e.target.value);
												setBuyAmount(
													(parseFloat(sellAmount) * 122.5).toFixed(2)
												);
												await setStateAsync(
													(parseFloat(sellAmount) * 122.5).toFixed(2)
												);
											}}
											className='text-2xl'
											placeholder='0'
										/>
										<Button
											variant='outline'
											className='flex items-center space-x-1'
										>
											<img
												src='/usdc.png'
												alt='USDC'
												className='w-5 h-5 rounded-full'
											/>
											<span>USDC</span>
											<ChevronDownIcon className='h-4 w-4' />
										</Button>
									</div>
									<div className='text-sm text-muted-foreground'>
										${(parseFloat(sellAmount) * 0.9999).toFixed(3)}
									</div>
								</div>
								<div className='flex justify-center'>
									<Button variant='ghost' size='icon' className='rounded-full'>
										<ArrowDownIcon className='h-4 w-4' />
									</Button>
								</div>
								<div className='space-y-2'>
									<div className='text-sm font-medium'>To</div>
									<div className='flex items-center space-x-2'>
										<Input
											type='number'
											value={buyAmount}
											onChange={(e) => setBuyAmount(e.target.value)}
											className='text-2xl'
											placeholder='0'
										/>
										<Select
											value={selectedValue}
											onValueChange={(value) => setSelectedValue(value)}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue
													placeholder='Select currency'
													className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Options</SelectLabel>
													<SelectItem value='etb'>
														<div className='flex space-x-2'>
															<img
																src='/etb.svg'
																alt='ETB'
																className='w-5 h-5 rounded-full'
															/>
															<span>ETB</span>
														</div>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{/* <Button
											variant='outline'
											className='flex items-center space-x-1  bg-gray-100 text-gray-600 hover:bg-gray-200'
										>
											<span>Select token</span>
											<ChevronDownIcon className='h-4 w-4' />
										</Button> */}
									</div>
								</div>
								{selectedValue == 'etb' ? (
									<>
										<div className='text-sm text-muted-foreground'>
											1 USDC = 122.5 ETB
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Converting ${sellAmount} USDC to ${(
														parseFloat(sellAmount) * 122.5
													).toFixed(2)} ETB`
												)
											}
										>
											Convert
										</Button>
									</>
								) : (
									<>
										<Button
											className='w-full bg-gray-100 text-gray-600 hover:bg-gray-200'
											disabled
										>
											Select a currency
										</Button>
									</>
								)}
							</div>
						</TabsContent>
						<TabsContent value='add'>
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<span className='text-sm font-medium'>
										You&apos;re buying
									</span>

									<Button
										variant='ghost'
										size='sm'
										className='flex items-center space-x-1'
									>
										<img
											src='/usdc.png'
											alt='USDC'
											className='w-5 h-5 rounded-full'
										/>
										<ChevronDownIcon className='h-4 w-4' />
									</Button>
								</div>
								<div className='items-center justify-center'>
									<div className='text-4xl text-center items-center font-bold'>
										${buyValue}
										{/* <Input
										type='text'
										value={buyValue}
										onChange={(e) => handleBuyValueChange(e.target.value)}
										className='text-2xl font-bold bg-transparent border-none focus:border-transparent focus:ring-0 p-0 w-1/2'
									/> */}
									</div>

									<div className='text-sm text-center text-muted-foreground items-center space-x-1'>
										<span>{buyToken}</span>
										{/* <ChevronDownIcon className='h-4 w-4' /> */}
									</div>
								</div>
								<div className='flex space-x-2'>
									{['100', '300', '1000'].map((value) => (
										<Button
											key={value}
											variant={buyValue === value ? 'secondary' : 'outline'}
											onClick={() => handleBuyValueChange(value)}
											className='flex-1'
										>
											${value}
										</Button>
									))}
								</div>

								<ZelleDeposit name={'Continue'} />
							</div>
						</TabsContent>
						<TabsContent value='withdraw'>
							<div className='space-y-4'>
								<div className='space-y-2'>
									{/* <div className='text-sm font-medium'>Sell</div> */}
									<div className='flex items-center mt-4 space-x-2'>
										<Input
											type='number'
											value={withdrawAmount}
											onChange={(e) => setWithdrawAmount(e.target.value)}
											className='text-2xl'
											placeholder='0'
										/>
										<Select
											value={withdrawSelected}
											onValueChange={(value) => setWithdrawSelected(value)}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue
													placeholder='Select type'
													className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Option</SelectLabel>
													<SelectItem value='usdc'>
														<div className='flex space-x-2'>
															<img
																src='/usdc.png'
																alt='USDC'
																className='w-5 h-5 rounded-full'
															/>
															<span>USDC</span>
														</div>
													</SelectItem>
													<SelectItem value='etb'>
														<div className='flex space-x-2'>
															<img
																src='/etb.svg'
																alt='ETB'
																className='w-5 h-5 rounded-full'
															/>
															<span>ETB</span>
														</div>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className='space-y-4'>
									<div className='flex items-center space-x-2'>
										<Input
											type='text'
											value={recipient}
											onChange={(e) => setRecipient(e.target.value)}
											className='text-2xl'
											placeholder='Address'
										/>
										<Select
											value={selectedSend}
											onValueChange={(value) => setSelectedSend(value)}
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue
													placeholder='Select type'
													className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Onchain</SelectLabel>
													<SelectItem value='usdc'>
														<div className='flex space-x-2'>
															<img
																src='/usdc.png'
																alt='USDC'
																className='w-5 h-5 rounded-full'
															/>
															<span>USDC</span>
														</div>
													</SelectItem>
												</SelectGroup>
												<SelectGroup>
													<SelectLabel>Banks</SelectLabel>
													<SelectItem value='cbe'>
														<div className='flex space-x-2'>
															<img
																src='/cbe.png'
																alt='cbe'
																className='w-5 h-5 rounded-full'
															/>
															<span>CBE</span>
														</div>
													</SelectItem>
													<SelectItem value='aws'>
														<div className='flex space-x-2'>
															<img
																src='/awash.png'
																alt='awash'
																className='w-5 h-5 rounded-full'
															/>
															<span>Awash</span>
														</div>
													</SelectItem>
													<SelectItem value='tele'>
														<div className='flex space-x-2'>
															<img
																src='/tele.jpg'
																alt='telebirr'
																className='w-5 h-5 rounded-full'
															/>
															<span>TeleBirr</span>
														</div>
													</SelectItem>
													<SelectItem value='boa'>
														<div className='flex space-x-2'>
															<img
																src='/abyssina.png'
																alt='boa'
																className='w-5 h-5 rounded-full'
															/>
															<span>BOA</span>
														</div>
													</SelectItem>
													<SelectItem value='oib'>
														<div className='flex space-x-2'>
															<img
																src='/oromiya.png'
																alt='boa'
																className='w-5 h-5 rounded-full'
															/>
															<span>COOP</span>
														</div>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{/* <Button
											variant='outline'
											className='flex items-center space-x-1 bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
										>
											<span>Select token</span>
											<ChevronDownIcon className='h-4 w-4' />
										</Button> */}
									</div>
								</div>
								{selectedSend == 'usdc' ? (
									<>
										<div className='space-y-1'>
											<span className='text-sm font-medium'>Routes</span>
											<div className='space-x-4 flex'>
												<div className='text-sm text-muted-foreground flex items-center space-x-2'>
													USD <ArrowRight className='h-4 w-4' />
													<span className='text-right'>USDC</span>
												</div>
												<div className='text-sm text-muted-foreground flex items-center space-x-2'>
													{parseFloat(withdrawAmount).toFixed(3)}{' '}
													<ArrowRight className='h-4 w-4' />{' '}
													{(parseFloat(withdrawAmount) * 0.995).toFixed(3)}
												</div>
												<div className='text-sm text-muted-foreground flex items-center'>
													{(
														Number(withdrawAmount) -
														Number(withdrawAmount) * 0.995
													).toFixed(3)}{' '}
													USDC
												</div>
											</div>
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Signing Withdraw of ${withdrawAmount} USDC`
												)
											}
										>
											Withdraw
										</Button>
									</>
								) : selectedSend == 'cbe' ? (
									<>
										<div className='text-sm text-muted-foreground text-left'>
											Bank fee: 2 ETB
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Signing Withdraw to CBE: ${withdrawAmount} ETB`
												)
											}
										>
											Withdraw
										</Button>
									</>
								) : selectedSend == 'aws' ? (
									<>
										<div className='text-sm text-muted-foreground text-left'>
											Bank fee: 0 ETB
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Signing Withdraw to Awash for ${withdrawAmount} ETB`
												)
											}
										>
											Withdraw
										</Button>
									</>
								) : selectedSend == 'tele' ? (
									<>
										<div className='text-sm text-muted-foreground text-left'>
											Bank fee: 2 ETB
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Signing Withdraw to Telebirr: ${withdrawAmount} ETB`
												)
											}
										>
											Withdraw
										</Button>
									</>
								) : selectedSend == 'boa' ? (
									<>
										<div className='text-sm text-muted-foreground text-left'>
											Bank fee: 4 ETB
										</div>
										<Button
											className='w-full bg-[#2ED06E]/90 text-white hover:bg-[#2ED06E]'
											onClick={async () =>
												await signWalletMessage(
													`Signing Withdraw for ${withdrawAmount} ETB`
												)
											}
										>
											Withdraw
										</Button>
									</>
								) : (
									<>
										<Button
											className='w-full bg-gray-100 text-gray-600 hover:bg-gray-200'
											disabled
										>
											Select a recipient
										</Button>
									</>
								)}
							</div>
						</TabsContent>
					</Tabs>
					{/* <Button variant='ghost' size='icon' className='ml-2'>
						<Settings2Icon className='h-4 w-4' />
					</Button> */}
				</div>
			</CardContent>
		</Card>
	);
}
