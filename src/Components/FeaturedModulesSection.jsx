import React from "react";

const sampleModules = [
	{
		id: 1,
		title: "Intro to Robotics",
		difficulty: "Beginner",
		description:
			"Learn robot parts, basic sensors and simple control loops. Hands-on lab with step-by-step guides.",
	},
	{
		id: 2,
		title: "Motor Control & Kinematics",
		difficulty: "Intermediate",
		description:
			"Understand DC/servo motors, PWM, and simple kinematics to make your robot move reliably.",
	},
	{
		id: 3,
		title: "Sensors & Perception",
		difficulty: "Intermediate",
		description:
			"Work with ultrasonic, IR, and basic vision concepts to let robots sense the world around them.",
	},
	{
		id: 4,
		title: "Autonomous Challenges",
		difficulty: "Advanced",
		description:
			"Design and test autonomous behaviors: path planning, obstacle avoidance and simple state machines.",
	},
];

export default function FeaturedModulesSection() {
	return (
		<section
			aria-labelledby="featured-modules-title"
			className="relative w-full bg-white/80 py-12"
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<header className="mb-8 md:mb-12">
					<h2
						id="featured-modules-title"
						className="text-2xl sm:text-3xl font-extrabold text-[#07142a]"
					>
						Featured Learning Modules
					</h2>
					<p className="mt-2 text-sm text-slate-600 max-w-2xl">
						Explore our most popular robotics lessons, from beginner to advanced.
					</p>
				</header>

				<ul
					className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
					role="list"
				>
					{sampleModules.map((mod) => (
						<li key={mod.id} className="group">
							<article
								className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] focus-within:shadow-xl"
								aria-labelledby={`module-${mod.id}-title`}
							>
								{/* thumbnail */}
								<div className="h-40 w-full rounded-t-2xl overflow-hidden bg-gradient-to-tr from-[#0b2a50] to-[#60a5fa] flex items-center justify-center">
									{/* placeholder illustration (SVG) */}
									<svg
										className="h-24 w-24 opacity-90"
										viewBox="0 0 64 64"
										xmlns="http://www.w3.org/2000/svg"
										role="img"
										aria-hidden="true"
									>
										<rect
											x="8"
											y="18"
											width="48"
											height="28"
											rx="4"
											fill="#072238"
										/>
										<circle cx="22" cy="32" r="4" fill="#9bdcff" />
										<rect
											x="36"
											y="28"
											width="8"
											height="8"
											rx="1.6"
											fill="#cfeefe"
										/>
										<path
											d="M18 46h28"
											stroke="#a6e0ff"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
								</div>

								{/* content */}
								<div className="p-4 flex-1 flex flex-col justify-between">
									<div>
										<div className="flex items-start justify-between gap-3">
											<h3
												id={`module-${mod.id}-title`}
												className="text-base font-semibold text-slate-900"
											>
												{mod.title}
											</h3>
											<span
												className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
													mod.difficulty === "Beginner"
														? "bg-emerald-100 text-emerald-800"
														: mod.difficulty === "Intermediate"
														? "bg-amber-100 text-amber-800"
														: "bg-rose-100 text-rose-800"
												}`}
												aria-label={`Difficulty: ${mod.difficulty}`}
											>
												{mod.difficulty}
											</span>
										</div>

										<p className="mt-3 text-sm text-slate-600 leading-snug">
											{mod.description}
										</p>
									</div>

									<div className="mt-4">
										<a
											href="#"
											className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-[#07142a] border border-transparent bg-sky-50 hover:bg-sky-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
										>
											View Lesson
										</a>
									</div>
								</div>
							</article>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}