import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Notifications } from '@/components/Notifications';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

export const metadata = {
	title: 'CollabMate',
	description: 'Friends',
};

export const Header = async () => {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<header className='text-white py-21 bg-primary'>
			<nav className='w-full flex justify-center'>
				<div className='w-full max-w-7xl flex justify-between items-center p-3 text-sm'>
					<div />
					<div>
						{user ? (
							<div className='flex-center gap-12'>
								<div className='flex-center gap-3'>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												className='bg-transparent group text-white hover:text-primary border-2 hover:border-secondaryYellow'>
												<svg
													className=' w-5 h-5 group-hover:text-secondaryYellow '
													fill='none'
													height='24'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													viewBox='0 0 24 24'
													width='24'
													xmlns='http://www.w3.org/2000/svg'>
													<path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
													<path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
												</svg>
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-80 p-0'>
											<Notifications />
										</PopoverContent>
									</Popover>
									<Avatar>
										<AvatarImage
											src={user.user_metadata.avatar_url}
										/>
										<AvatarFallback>
											<Skeleton className='w-[100px] h-[20px] rounded-full' />
										</AvatarFallback>
									</Avatar>
									Hey, {user.user_metadata.full_name}!
								</div>
							</div>
						) : (
							<Link
								href='/login'
								className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
								Login
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;