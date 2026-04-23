import type { ICharacterFilters } from '../types/api.type'

export const FAVORITES_STORAGE_KEY = 'rick-and-morty-favorites'

export const STATUS_OPTIONS: { value: '' | NonNullable<ICharacterFilters['status']>; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
]

export const STATUS_COLOR: Record<string, string> = {
  Alive: 'teal',
  Dead: 'red',
  unknown: 'gray',
}
