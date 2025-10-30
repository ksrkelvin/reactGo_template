const NavBar =()=>{
	return (
		<nav className="bg-white shadow-md border-b border-gray-200">
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col md:flex-row items-center justify-between py-4 md:space-x-4">
				<div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
					<a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
						EncontraDev
					</a>
				</div>
				<div className="flex items-center w-full md:max-w-md justify-between">
					<button
						className="md:hidden ml-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
						// onClick={() => toggleSidebar()}
						aria-label="Abrir menu"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					<div className="flex-1">
						<form className="relative">
							<input
								type="text"
								placeholder="Pesquisar desenvolvedores, habilidades..."
								className="w-full border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<button
								type="submit"
								className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 flex items-center justify-center transition-colors"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</nav>
	)
}

export default NavBar;
