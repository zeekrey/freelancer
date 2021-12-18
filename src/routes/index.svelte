<script lang="ts">
	let workDays: number = 198;
	let workHours: number = 7.5;
	let salary: number = 50;
	let businessCosts: number = 200 * 12;
	let insuranceCosts: number = 600 * 12;
	let incomeTax: number = 0;

	$: daylieTurnover = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
		workHours * salary
	);
	$: yearlyTurnover = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
		workHours * salary * workDays
	);
	$: incomeBeforeTax = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(workHours * salary * workDays - businessCosts);
	$: income = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
		workHours * salary * workDays - businessCosts - incomeTax - insuranceCosts
	);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<fieldset>
	<legend>User input</legend>

	<label for="workDays">Arbeitstage im Jahr</label>
	<input type="number" min="0.00" step="0.01" bind:value={workDays} id="workDays" />
	<details>
		Im Durchschnitt arbeitet ein/e Deutsche/r 198Tage im Jahr. Von 365 Kalendertagen sind
		beispielsweise folgende Tage abzuziehen: 104 Tage Wochenende 📅, 11 Feiertage 🎉, 14 krank 🤒,
		10 Tage 👨‍🍼🤱, 28 Urlaub 🌴 = 198 Tage
	</details>

	<label for="workHours">Arbeitsstunden pro Tag</label>
	<input type="number" bind:value={workHours} id="workHours" />
	<details>
		Du solltest vor Antritt deiner Tätigkeit dringend klären wie viele Wochenstunden von dir
		erwartet werden bzw. du in abrufen kannst. Bei einem Vollzeit-Job kannst du mit 38 bis 40
		Stunden pro Woche rechnen.
	</details>

	<label for="salary">Stundenlohn (netto)</label>
	<input type="number" bind:value={salary} id="salary" />
	<details>Stundenlohn ohne Umsatzsteuer.</details>

	<label for="businessCosts">Betriebsausgeben pro Jahr</label>
	<input type="number" bind:value={businessCosts} id="businessCosts" />
	<details>
		Als Betriebsausgaben werden Kosten bezeichnet, die du hast um deine Arbeit auszuführen. Bist du
		Software Entwickler? Dann brauchst du wahrscheinlich einen Computer. Aber auch Reisemittel sind
		Betriebskosten. Mehr dazu steht bei Github.
	</details>

	<label for="incomeTax">Income Tax</label>
	<input type="number" bind:value={incomeTax} id="incomeTax" />
	<details>
		Auf deine Einnahmen abzüglich Betriebskosten musst du Einkommenssteuer bezahlen.
	</details>

	<label for="insuranceCosts">Versicherungskosten pro Jahr</label>
	<input type="number" bind:value={insuranceCosts} id="insuranceCosts" />
	<details>
		Hier können alle Arte von Versicherungen erfassten werden. Der sicher größte Posten ist die
		Krankversicherung.
	</details>
</fieldset>

<fieldset>
	<legend>Calculated</legend>
	<label for="daylieTurnover">Tagesverdienst</label>
	<input type="string" bind:value={daylieTurnover} id="daylieTurnover" disabled />

	<label for="yearlyTurnover">Jahresverdienst</label>
	<input type="string" bind:value={yearlyTurnover} id="yearlyTurnover" disabled />

	<label for="incomeBeforeTax">Einkommen vor Steuer</label>
	<input type="string" bind:value={incomeBeforeTax} id="incomeBeforeTax" disabled />

	<label for="income">Einkommen nach Steuer</label>
	<input type="string" bind:value={income} id="income" disabled />
</fieldset>

<style>
	input {
		display: block;
	}
</style>
