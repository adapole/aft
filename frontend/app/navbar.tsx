'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, CopyIcon, User } from 'lucide-react';
// Particle imports
import {
	ConnectButton,
	useAccount,
	useDisconnect,
	useParticleAuth,
} from '@particle-network/connectkit';
import { useEffect, useState } from 'react';

export default function NavBar() {
	const { address, isConnected, isConnecting, isDisconnected, chainId } =
		useAccount();
	const { disconnect, disconnectAsync } = useDisconnect();
	const { getUserInfo } = useParticleAuth();

	const [userInfo, setUserInfo] = useState<any>(null);
	const [account, setAccount] = useState(null);
	const [userAddress, setUserAddress] = useState<string>('');

	// Handle user disconnect action
	const handleDisconnect = async () => {
		try {
			await disconnectAsync();
		} catch (error) {
			console.error('Error disconnecting:', error);
		}
	};

	// Function to truncate Ethereum address
	const truncateAddress = (address: string) => {
		return address.slice(0, 6) + '...' + address.slice(-4);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			alert('Copied to clipboard!');
		});
	};

	useEffect(() => {
		async function loadAccount() {
			if (address) {
				setAccount(account);
				setUserAddress(address);
				// await fetchBalance();
			}
		}
		loadAccount();
	}, [chainId, address]);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const userInfo = await getUserInfo();
				console.log(userInfo);
				setUserInfo(userInfo);
			} catch (error) {
				console.error('Error fetching user info:', error);
			}
		};

		if (isConnected) {
			fetchUserInfo();
		}
	}, [isConnected, getUserInfo]);

	return (
		<div className='flex items-center gap-2'>
			<Button variant='ghost' size='icon'>
				<Bell className='h-5 w-5' />
				<span className='sr-only'>Notifications</span>
			</Button>
			{isConnected ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
							<User className='h-6 w-6' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<DropdownMenuLabel className='font-normal'>
							<div className='flex flex-col space-y-1'>
								<p className='text-sm font-medium leading-none'>
									{userInfo ? <span>{userInfo.name || 'N/A'}</span> : 'N/A'}
								</p>
								<p className='text-xs leading-none text-muted-foreground'>
									Address: <code>{truncateAddress(userAddress)}</code>
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => copyToClipboard(userAddress)}>
							<CopyIcon className='mr-2 h-4 w-4' />
							<span>
								<code>{truncateAddress(userAddress)}</code>
							</span>
						</DropdownMenuItem>
						{/* <DropdownMenuItem>
							<CopyIcon
								className='mr-2 h-4 w-4'
								onClick={() => copyToClipboard(userAddress)}
							/>
						</DropdownMenuItem> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button variant={null} onClick={handleDisconnect}>
								<span>Disconnect</span>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<ConnectButton />
			)}
		</div>
	);
}
