import Link from "next/link";

export const metadata = {
	title: "Todo App",
	description: "Manage your Day with Todo",
};

export default function Home() {
	return (
		<Link
			className="flex w=20% p-8 justify-center align-middle items-center bg-white text-black m-8"
			href="/dashboard"
		>
			<div>Go to Dashboard</div>
		</Link>
	);
}
