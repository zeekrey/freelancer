import { cleanup, render } from '@testing-library/svelte';
import { afterEach, it, expect, describe } from 'vitest';
import http from 'http';

const request = (path: string) =>
	new Promise((resolve) => {
		http.get({ hostname: 'localhost', port: 3000, path }, (response) => {
			let data = '';
			response.on('data', (_data) => (data += _data));
			response.on('end', () => resolve(data));
		});
	});

describe('API / incomeTax', () => {
	// afterEach(() => cleanup());

	it('should work', async () => {
		const RE4 = '2500000';
		const STKL = '1';

		const res = await request(`/api/incomeTax?RE4=${RE4}&STKL=${STKL}`);
		expect(res).toBe(JSON.stringify({ lstlzz: '215100' }));
	});
});
