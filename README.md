# Aadhaar Harm Database

Documentation of harms caused by Aadhaar-based authentication failures and exclusions from welfare schemes.

## Data

- `data/aadhaar_harm_cases.json` — Full dataset (66+ cases)
- `data/aadhaar_harm_cases.csv` — CSV export
- `data/schema.sql` — Database schema

Fields:
- `id` — Case identifier (e.g., A1, A2)
- `section` — Category (A: Starvation deaths, B: Pension, C: NREGA, etc.)
- `case_type` — Type of harm
- `name` — Person/group name
- `details` — Entitlement denied / mechanism of failure
- `outcome` — Result of the harm
- `gender`, `age`, `location`, `year` — Demographics
- `notes` — Deduplication and context
- `source` — Citation (news article, report, etc.)

## License

This dataset is released under the [Open Database License (ODbL)](LICENSE) v1.0.

## Attribution

If you use this data, please attribute: "Aadhaar Harm Database, CashlessConsumer (2025)"

## How to Contribute

We accept new case submissions via GitHub Issues or by running the aadhaar_harm skill (see below). Please include reliable sources.

## Tools

We provide a skill for adding and monitoring cases:

```bash
cd nanobot-skills/aadhaar_harm
npm install
node index.js add --id "A101" --section "A" --case_type "..." --name "..." ...
node index.js stats
node index.js monitor --commit
```

See [SKILL.md](nanobot-skills/aadhaar_harm/SKILL.md) for full documentation.

## Website

Browse the data at: **https://[your-org].github.io/aadhaar-harm-db/**

Built with pure HTML/CSS/JS (no backend required).

## Citation

```
@misc{aadhaarharm2025,
  title={Aadhaar Harm Database},
  author={CashlessConsumer},
  year={2025},
  url={https://github.com/cashlessconsumer/aadhaar-harm-db}
}
```
