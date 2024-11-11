'use client';

import React, { useEffect, useState } from 'react';

// Particle imports
import {
	ConnectButton,
	useAccount,
	useDisconnect,
	useParticleAuth,
} from '@particle-network/connectkit';

export default function Connect() {
	// Initialize account-related states from Particle's useAccount hook
	const { address, isConnected, isConnecting, isDisconnected, chainId } =
		useAccount();
	const { disconnectAsync } = useDisconnect();
	const { getUserInfo } = useParticleAuth();

	// Define state variables
	const [account, setAccount] = useState(null);
	// const [balance, setBalance] = useState<string>('');
	const [userAddress, setUserAddress] = useState<string>('');
	const [userInfo, setUserInfo] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
	const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(false);
	const [userInfoError, setUserInfoError] = useState<string | null>(null);

	// Connection status message based on the account's connection state
	const connectionStatus = isConnecting
		? 'Connecting...'
		: isConnected
		? 'Connected'
		: isDisconnected
		? 'Disconnected'
		: 'Unknown';

	// Load account details and fetch balance when address or chainId changes
	useEffect(() => {
		async function loadAccount() {
			if (address) {
				setAccount(account);
				setUserAddress(address);
				// await fetchBalance();
				console.log(connectionStatus);
			}
		}
		loadAccount();
	}, [chainId, address]);

	// Fetch and set user information when connected
	useEffect(() => {
		const fetchUserInfo = async () => {
			setIsLoadingUserInfo(true);
			setUserInfoError(null);

			try {
				const userInfo = await getUserInfo();
				console.log(userInfo);
				setUserInfo(userInfo);
			} catch (error) {
				setUserInfoError(
					'Error fetching user info: The current wallet is not a particle wallet.'
				);
				console.error('Error fetching user info:', error);
			} finally {
				setIsLoadingUserInfo(false);
			}
		};

		if (isConnected) {
			fetchUserInfo();
		}
	}, [isConnected, getUserInfo]);

	// Fetch user's balance and format it for display
	//   const fetchBalance = async () => {
	//     try {
	//       if (!address) return;
	//       const balanceResponse = await publicClient?.getBalance({ address });
	//       const balanceInEther = formatEther(balanceResponse!);
	//       console.log(balanceResponse);
	//       setBalance(parseFloat(balanceInEther).toFixed(4)); // Display balance with 4 decimal places
	//     } catch (error) {
	//       console.error("Error fetching balance:", error);
	//     }
	//   };

	// Handle user disconnect action
	const handleDisconnect = async () => {
		try {
			await disconnectAsync();
		} catch (error) {
			console.error('Error disconnecting:', error);
		}
	};

	// Parameters for the on-ramp URL
	const fiatCoin = 'USD';
	const cryptoCoin = 'ETH';
	const network = 'Ethereum';
	const theme = 'dark';
	const language = 'en';

	// Function to handle the on-ramp button click
	const handleOnRamp = () => {
		const onRampUrl = `https://ramp.particle.network/?fiatCoin=${fiatCoin}&cryptoCoin=${cryptoCoin}&network=${network}&theme=${theme}&language=${language}`;
		window.open(onRampUrl, '_blank');
	};

	// Function to copy text to clipboard
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			alert('Copied to clipboard!');
		});
	};

	// Function to truncate Ethereum address
	const truncateAddress = (address: string) => {
		return address.slice(0, 6) + '...' + address.slice(-4);
	};

	return (
		<div className=' flex flex-col items-center justify-between p-8 bg-black text-white'>
			<main className='flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto'>
				{isConnected ? (
					<>
						<div className='flex justify-center w-full'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'>
								<div className='border border-purple-500 p-6 rounded-lg'>
									{isLoadingUserInfo ? (
										<div>Loading user info...</div>
									) : userInfoError ? (
										<div className='text-red-500'>{userInfoError}</div>
									) : (
										userInfo && ( // Conditionally render user info
											<div className='flex items-center'>
												<h2 className='text-lg font-semibold text-white mr-2'>
													Name: {userInfo.name || 'N/A'}
												</h2>
												{userInfo.avatar && (
													<img
														src={userInfo.avatar}
														alt='User Avatar'
														className='w-10 h-10 rounded-full'
													/>
												)}
											</div>
										)
									)}
									<h2 className='text-lg font-semibold mb-2 text-white flex items-center'>
										Address: <code>{truncateAddress(userAddress)}</code>
										<button
											className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 ml-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center'
											onClick={() => copyToClipboard(userAddress)}
										>
											📋
										</button>
									</h2>
									<h2 className='text-lg font-semibold mb-2 text-white'>
										Chain ID: <code>{chainId}</code>
									</h2>
									<button
										className='mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
										onClick={handleOnRamp}
									>
										Buy Crypto with Fiat
									</button>
									<div>
										<button
											className='mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
											onClick={handleDisconnect}
										>
											Disconnect
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<ConnectButton />
				)}
			</main>
		</div>
	);
}
