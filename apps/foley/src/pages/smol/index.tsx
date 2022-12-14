import { Button, Input, Spinner } from '@clfxc/ui';
import { URLS } from '@declarations/enums';
import { urlSchema } from '@declarations/schemas';
import { baseUrl } from '@utils/misc';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';

// interface Props {}

const SmolPage: NextPage = () => {
	const [isTransition, startTransition] = useTransition();

	const [loading, setLoading] = useState<boolean>(false);
	const [url, setUrl] = useState<string>('');
	const [smol, setSmol] = useState<string>('');

	const handleChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	}, []);

	const handleMakeSmol = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			startTransition(() => setLoading(true));

			const parsed = urlSchema.safeParse(url);
			if (!url.length || !parsed.success) {
				console.warn('invalid url');
				setLoading(false);
				return;
			}

			const fetchUrl = `${baseUrl}/api${URLS.SMOL}/create`;
			try {
				const data = await (
					await fetch(fetchUrl, {
						method: 'POST',
						body: JSON.stringify({ url }),
						headers: {
							'Content-Type': 'application/json',
						},
					})
				).json();

				setSmol(data?.smol ?? '');
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log('something went wrong', error);
			}
		},
		[url]
	);

	return (
		<section className="grid place-content-center place-items-center leading-tight min-h-screen px-4 bg-[var(--clr-bg-300)]">
			<a
				style={{ textDecorationColor: '#9d679c', color: 'white' }}
				className={`underline underline-offset-4 text-center font-light text-lg ${
					!Boolean(smol.length) ? 'invisible' : ''
				}`}
				target="_blank"
				href={smol}
				rel="noreferrer"
			>
				{String(smol?.split('://')[1])}
				<br />
				<span className="text-black text-center font-bold">/|\ ^._.^ /|\</span>
			</a>

			<h1
				style={{ fontSize: 'clamp(7rem, 14vw, 12rem)' }}
				className="font-underdog text-center text-white sm:leading-none"
			>
				make smol
			</h1>

			<Spinner variant="puff" className={`stroke-white relative top-[5.5rem] ${!loading ? 'invisible' : ''}`} />

			<form
				onSubmit={handleMakeSmol}
				className={`grid auto-rows-auto gap-8 place-items-center w-full ${loading ? 'invisible' : ''}`}
			>
				<span className={`text-center text-3xl ${!Boolean(smol.length) ? 'invisible' : ''}`}>????</span>
				<Input
					className="w-full max-w-[30rem] bg-[var(--clr-bg-500)] text-white border-4 outline-[var(--clr-orange)] focus:outline-offset-8 focus:outline-dashed"
					value={url}
					onChange={handleChangeUrl}
				/>
				<Button type="submit" className="button border-white text-white" disabled={isTransition || loading}>
					boop
				</Button>
			</form>
		</section>
	);
};

export default SmolPage;
