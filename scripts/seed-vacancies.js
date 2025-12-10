/**
 * Seed realistic vacancy entries using Strapi's entity service.
 *
 * Run (from repo root):
 *   NODE_ENV=development node scripts/seed-vacancies.js
 *
 * If running in Docker, stop the strapi service to avoid port conflicts, keep DB up, then:
 *   docker compose run --rm strapi node scripts/seed-vacancies.js
 *
 * The script is idempotent on title: existing titles are skipped.
 */
const { createStrapi } = require('@strapi/strapi');

const blocks = (paragraphs) =>
  paragraphs.map((text) => ({
    type: 'paragraph',
    children: [{ type: 'text', text }],
  }));

const vacancies = [
  {
    title: 'Senior Civil Engineer (Infrastructure)',
    description: blocks([
      'Lead road and drainage design packages for mixed-use developments, coordinating with survey, utilities, and geotech teams.',
      'Deliver IFC drawings, BOQs, and site clarifications while mentoring two junior engineers.',
    ]),
    employment_type: 'Full-time',
    location: 'Addis Ababa, Ethiopia',
    salary_min: 42000,
    salary_max: 52000,
    status: 'open',
    posted_at: new Date('2025-12-01T08:00:00Z'),
    deadline: new Date('2026-01-05'),
  },
  {
    title: 'Electrical Project Manager (Commercial Fit-out)',
    description: blocks([
      'Oversee MV/LV distribution, lighting, and ELV systems for a 12-floor commercial fit-out.',
      'Manage subcontractors, QA checklists, and commissioning with a strong safety record.',
    ]),
    employment_type: 'Full-time',
    location: 'Nairobi, Kenya',
    salary_min: 38000,
    salary_max: 46000,
    status: 'open',
    posted_at: new Date('2025-12-03T09:00:00Z'),
    deadline: new Date('2026-01-10'),
  },
  {
    title: 'Site HSE Lead (Industrial Plant)',
    description: blocks([
      'Implement HSE plans for a brownfield expansion, including PTW, JSAs, and daily toolbox talks.',
      'Track leading/lagging indicators and drive corrective actions with construction managers.',
    ]),
    employment_type: 'Contract (12 months)',
    location: 'Dire Dawa, Ethiopia',
    salary_min: 30000,
    salary_max: 36000,
    status: 'open',
    posted_at: new Date('2025-11-28T07:30:00Z'),
    deadline: new Date('2026-01-02'),
  },
  {
    title: 'BIM Coordinator (Structural)',
    description: blocks([
      'Coordinate structural models in Revit with clash detection routines and clean documentation sets.',
      'Support model-based quantity take-offs and ensure naming/LOD compliance across disciplines.',
    ]),
    employment_type: 'Full-time',
    location: 'Remote (UTC+2)',
    salary_min: 28000,
    salary_max: 34000,
    status: 'open',
    posted_at: new Date('2025-12-04T10:00:00Z'),
    deadline: new Date('2026-01-12'),
  },
  {
    title: 'Procurement Specialist (Construction)',
    description: blocks([
      'Source MEP and finishing packages, negotiate terms, and manage supplier performance dashboards.',
      'Coordinate logistics, customs clearance, and delivery schedules aligned with site look-ahead plans.',
    ]),
    employment_type: 'Full-time',
    location: 'Addis Ababa, Ethiopia',
    salary_min: 26000,
    salary_max: 32000,
    status: 'open',
    posted_at: new Date('2025-12-06T09:00:00Z'),
    deadline: new Date('2026-01-15'),
  },
];

(async () => {
  const strapi = await createStrapi();
  await strapi.start();

  try {
    for (const vacancy of vacancies) {
      const existing = await strapi.entityService.findMany('api::vacancy.vacancy', {
        filters: { title: vacancy.title },
        limit: 1,
      });
      if (existing && existing.length) {
        console.log(`Skipped (exists): ${vacancy.title}`);
        continue;
      }

      const created = await strapi.entityService.create('api::vacancy.vacancy', {
        data: {
          ...vacancy,
          publishedAt: new Date(),
        },
      });
      console.log(`Seeded: ${created.title}`);
    }
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
})();

