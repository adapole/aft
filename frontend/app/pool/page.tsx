// import AddLiquidity from './addliquidity';
import NavBar from '../navbar';
import SideBar from '../sidebar';
import PoolPage from './pool';

export default function Home() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='flex h-16 items-center justify-between border-b bg-white px-4'>
				<SideBar />
				<NavBar />
			</header>
			<main className='p-4'>
				<div className='container mx-auto px-4'>
					<PoolPage />
				</div>
			</main>
		</div>
	);
}
