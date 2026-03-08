const heroImage = new Proxy({"src":"/_astro/unnamed.DEaivei5.jpg","width":687,"height":1024,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/assets/unnamed.jpg";
							}
							
							return target[name];
						}
					});

export { heroImage as h };
