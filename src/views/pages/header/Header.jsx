
const Header = () => {
    return (
			<div className="navbar">
				<div className="flex-1">
					<div className="ml-3 cursor-pointer">
						<h1 className="text-xl text-violet-900 font-bold">MyTrello</h1>
					</div>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label tabIndex="0" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src="https://api.lorem.space/image/face?hash=33791" alt="pic" />
							</div>
						</label>
						<ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li><a>Settings</a></li>
							<li><a>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
    );
};

export default Header;