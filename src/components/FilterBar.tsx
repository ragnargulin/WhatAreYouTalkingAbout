// src/components/FilterBar.tsx
import styled from 'styled-components'

const FilterBarContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const RegionSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`

const SortSelect = styled(RegionSelect)``

const TranslateToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

interface FilterOptions {
  region?: string
  sort: 'latest' | 'top'
  translate: boolean
}

interface FilterBarProps {
  filterOptions: FilterOptions
  onFilterChange: (newOptions: Partial<FilterOptions>) => void
}

export function FilterBar({ filterOptions, onFilterChange }: FilterBarProps) {
  return (
    <FilterBarContainer>
      <RegionSelect 
        value={filterOptions.region} 
        onChange={(e) => onFilterChange({ region: e.target.value })}
      >
        <option value="all">All Regions</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
        <option value="americas">Americas</option>
        <option value="africa">Africa</option>
        <option value="oceania">Oceania</option>
      </RegionSelect>

      <SortSelect 
        value={filterOptions.sort}
        onChange={(e) => onFilterChange({ 
          sort: e.target.value as 'latest' | 'top' 
        })}
      >
        <option value="latest">Latest</option>
        <option value="top">Top</option>
      </SortSelect>

      <TranslateToggle>
        <input
          type="checkbox"
          checked={filterOptions.translate}
          onChange={(e) => onFilterChange({ 
            translate: e.target.checked 
          })}
        />
        Translate to English
      </TranslateToggle>
    </FilterBarContainer>
  )
}