import { describe, it, expect, vi, beforeEach } from 'vitest';

const invoke = vi.fn();
vi.mock('../../supabase', () => ({ supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } } }));
vi.mock('../../auth', () => ({ ensureAnonymousSession: vi.fn(async () => ({ user: { id: 'u1' } })) }));

import {
  getDiagnosisView,
  normalizeDiagnosis,
  mapGatewayError,
  diagnosePlant,
  type PlantDiagnosis,
} from '../plantDiagnosis';

function base(overrides: Partial<PlantDiagnosis> = {}): PlantDiagnosis {
  return {
    is_plant: true,
    photo_usable: true,
    photo_issue: 'none',
    retake_tip: '',
    plant: { common_name: 'Rice', scientific_name: 'Oryza sativa', catalog_crop_id: 'crop-rice', identification_confidence: 'high' },
    health_status: 'problem_found',
    candidates: [
      { name: 'Rice Blast', catalog_condition_id: 'disease-rice-blast', category: 'fungal_disease', likelihood: 'likely', visible_evidence: 'Eye-shaped grey lesions.' },
      { name: 'Brown Spot', catalog_condition_id: 'disease-rice-brownspot', category: 'fungal_disease', likelihood: 'possible', visible_evidence: 'Some small brown spots.' },
    ],
    follow_up_question: '',
    summary: 'Rice leaf with lesions.',
    general_care: ['Remove badly affected leaves.'],
    ...overrides,
  };
}

describe('getDiagnosisView', () => {
  it('leads with "not a plant" when no plant is found', () => {
    expect(getDiagnosisView(base({ is_plant: false, candidates: [] }))).toBe('not_plant');
  });
  it('asks for a better photo when the photo is unusable', () => {
    expect(getDiagnosisView(base({ photo_usable: false }))).toBe('unclear_photo');
  });
  it('shows healthy', () => {
    expect(getDiagnosisView(base({ health_status: 'healthy', candidates: [] }))).toBe('healthy');
  });
  it('shows "likely" only when the top candidate is marked likely', () => {
    expect(getDiagnosisView(base())).toBe('likely');
    const allPossible = base();
    allPossible.candidates = allPossible.candidates.map((c) => ({ ...c, likelihood: 'possible' }));
    expect(getDiagnosisView(allPossible)).toBe('possible');
  });
  it('shows "not sure yet" when uncertain or with no candidates', () => {
    expect(getDiagnosisView(base({ health_status: 'uncertain' }))).toBe('uncertain');
    expect(getDiagnosisView(base({ candidates: [] }))).toBe('uncertain');
  });
});

describe('normalizeDiagnosis', () => {
  it('keeps catalog ids that exist and belong to the identified crop', () => {
    const d = normalizeDiagnosis(base())!;
    expect(d.plant.catalog_crop_id).toBe('crop-rice');
    expect(d.candidates[0].catalog_condition_id).toBe('disease-rice-blast');
  });
  it('drops a condition id that belongs to a different crop', () => {
    const raw = base();
    raw.candidates[0].catalog_condition_id = 'disease-tomato-earlyblight';
    expect(normalizeDiagnosis(raw)!.candidates[0].catalog_condition_id).toBe('');
  });
  it('drops unknown crop ids, and with them every condition id', () => {
    const raw = base({ plant: { common_name: 'Rose', scientific_name: 'Rosa', catalog_crop_id: 'crop-rose', identification_confidence: 'high' } });
    const d = normalizeDiagnosis(raw)!;
    expect(d.plant.catalog_crop_id).toBe('');
    expect(d.candidates.every((c) => c.catalog_condition_id === '')).toBe(true);
  });
  it('rejects malformed payloads', () => {
    expect(normalizeDiagnosis(null)).toBeNull();
    expect(normalizeDiagnosis({ foo: 1 })).toBeNull();
  });
});

describe('mapGatewayError', () => {
  it('maps the daily limit to a non-retryable message', () => {
    const m = mapGatewayError({ error: 'DailyScanLimitReached', message: 'Used all 50.' });
    expect(m.kind).toBe('daily_limit');
    expect(m.retryable).toBe(false);
  });
  it('never blames the network for a server configuration problem', () => {
    const m = mapGatewayError({ error: 'ConfigurationError' });
    expect(m.kind).toBe('not_configured');
    expect(m.message.toLowerCase()).not.toContain('connect');
  });
  it('treats unknown errors as retryable server errors', () => {
    expect(mapGatewayError(null, 500)).toMatchObject({ kind: 'server', retryable: true });
  });
});

describe('diagnosePlant', () => {
  beforeEach(() => invoke.mockReset());

  it('returns the normalized diagnosis on success', async () => {
    invoke.mockResolvedValue({ data: { success: true, diagnosis: base(), quota: { scansRemainingToday: 9 }, metadata: { model: 'claude-sonnet-5-5' } }, error: null });
    const out = await diagnosePlant('data:image/jpeg;base64,AAAA', 'crop-rice');
    expect(out.ok).toBe(true);
    if (out.ok) {
      expect(out.model).toBe('claude-sonnet-5-5');
      expect(out.diagnosis.candidates[0].catalog_condition_id).toBe('disease-rice-blast');
    }
    expect(invoke).toHaveBeenCalledWith('diagnose-plant', expect.objectContaining({ body: expect.objectContaining({ cropHint: 'crop-rice' }) }));
  });

  it('surfaces the gateway error body instead of a generic message', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { name: 'FunctionsHttpError', context: { status: 429, json: async () => ({ error: 'DailyScanLimitReached', message: 'Used all 50 scans.' }) } },
    });
    const out = await diagnosePlant('data:image/jpeg;base64,AAAA');
    expect(out).toMatchObject({ ok: false, kind: 'daily_limit', message: 'Used all 50 scans.' });
  });

  it('reports a network failure as offline/unreachable', async () => {
    invoke.mockResolvedValue({ data: null, error: { name: 'FunctionsFetchError', context: {} } });
    const out = await diagnosePlant('data:image/jpeg;base64,AAAA');
    expect(out).toMatchObject({ ok: false, kind: 'offline', retryable: true });
  });

  it('rejects an unreadable success payload', async () => {
    invoke.mockResolvedValue({ data: { success: true, diagnosis: { nope: true } }, error: null });
    const out = await diagnosePlant('data:image/jpeg;base64,AAAA');
    expect(out).toMatchObject({ ok: false, kind: 'server' });
  });
});
