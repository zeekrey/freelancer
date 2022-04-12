import { rest } from 'msw';

export const handlers = [
	// Handle GET /api/incomeTax requests
	rest.get('/api/incomeTax', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ lstlzz: '215100' }));
	})
];
