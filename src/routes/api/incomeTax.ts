import { XMLParser } from 'fast-xml-parser';
import type { RequestHandler } from '@sveltejs/kit';

const parser = new XMLParser({
	ignoreAttributes: false
});

export const get: RequestHandler = async ({ request }) => {
	/**
	 * As defined here: https://www.bmf-steuerrechner.de/interface/einganginterface.xhtml
	 * The XML reponse is defined here: https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2022.xml.xhtml
	 */

	const [RE4, STKL] = new URL(request.url).searchParams.values();

	if (!RE4 || !STKL) return { status: 400, body: { error: 'Please provide RE4 and STKL.' } };

	const res = await fetch(
		`http://www.bmf-steuerrechner.de/interface/2022Version1.xhtml?code=2022eP&LZZ=1&RE4=${RE4}&STKL=${STKL}`
	);

	// The API return XML
	const raw = await res.text();

	// The returned XML contains excape chars (\) that need to be removed before parsing
	const parsedXml = parser.parse(raw.replace('\\', ''));

	// LSTLZZ = Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents:
	const { '@_value': lstlzz } = parsedXml.lohnsteuer.ausgaben.ausgabe.find(
		(item) => item['@_name'] === 'LSTLZZ'
	);

	return {
		status: 200,
		body: { lstlzz }
	};
};
