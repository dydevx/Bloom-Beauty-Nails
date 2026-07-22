import { describe, expect, it } from 'vitest'
import { getBerlinStatus } from './businessHours.js'

describe('Berlin opening status', () => {
  it('is open on a weekday afternoon', () => expect(getBerlinStatus(new Date('2026-07-20T12:00:00Z')).open).toBe(true))
  it('shows the opening time before opening', () => expect(getBerlinStatus(new Date('2026-07-20T05:00:00Z')).label).toBe('Öffnet um 09:00 Uhr'))
  it('is closed on Sunday', () => expect(getBerlinStatus(new Date('2026-07-19T12:00:00Z')).label).toBe('Heute geschlossen'))
  it('uses German winter time', () => expect(getBerlinStatus(new Date('2026-01-19T08:15:00Z')).open).toBe(true))
})
