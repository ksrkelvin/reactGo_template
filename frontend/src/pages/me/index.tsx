import { useAuth } from "../../contexts/auth";

const MePage = () => {
	 const { user } = useAuth();

	 console.log('MePage user:', user);
	return (
		<div className="max-w-6xl mx-auto flex flex-col gap-6">
		<div className="bg-white rounded-lg shadow-md p-6">
			<div>
				<h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Me!</h1>
				<p className="text-gray-600">Email: {user?.email}</p>
				<p className="text-gray-600">Name: {user?.name}</p>
			</div>
		</div>
	</div>
	)
}

export default MePage
