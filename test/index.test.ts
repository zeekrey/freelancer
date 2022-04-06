import { cleanup, render } from '@testing-library/svelte';
import { afterEach, it, expect, describe } from 'vitest';
import Index from '../src/routes/index.svelte';

describe('Index', () => {
	afterEach(() => cleanup());

	it('should work', () => {
		const { container } = render(Index);
		expect(container).toBeTruthy();
	});
});
