import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BurgerButton from './BurgerButton'
import type { RootState } from '../store/store'
import { setColumns, setTone, toggleColor, toggleShape } from '../store/filtersSlice'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { shapes, colors, tone, columns } = useSelector(
    (state: RootState) => state.filters,
  )

  return (
    <header className="header">
      <div className="header-left">
        <BurgerButton
          isOpen={menuOpen}
          onToggle={() => setMenuOpen((value) => !value)}
        />
        <h1 className="header-title">Circles and Squares, v.1.0</h1>
      </div>
      <div className="header-filters">
        <label className="header-check">
          <input
            type="checkbox"
            checked={shapes.circle}
            onChange={() => dispatch(toggleShape('circle'))}
          />
          <span>Circles</span>
        </label>
        <label className="header-check">
          <input
            type="checkbox"
            checked={shapes.square}
            onChange={() => dispatch(toggleShape('square'))}
          />
          <span>Squares</span>
        </label>
      </div>
      {menuOpen ? (
        <div className="header-menu">
          <p className="header-menu-title">Filters</p>
          <div className="menu-section">
            <p className="menu-label">Tone</p>
            <label className="menu-radio">
              <input
                type="radio"
                name="tone"
                checked={tone === 'all'}
                onChange={() => dispatch(setTone('all'))}
              />
              <span>all</span>
            </label>
            <label className="menu-radio">
              <input
                type="radio"
                name="tone"
                checked={tone === 'dark'}
                onChange={() => dispatch(setTone('dark'))}
              />
              <span>dark</span>
            </label>
            <label className="menu-radio">
              <input
                type="radio"
                name="tone"
                checked={tone === 'light'}
                onChange={() => dispatch(setTone('light'))}
              />
              <span>light</span>
            </label>
          </div>
          <div className="menu-section">
            <p className="menu-label">Colors</p>
            <label className="menu-check">
              <input
                type="checkbox"
                checked={colors.red}
                onChange={() => dispatch(toggleColor('red'))}
              />
              <span>red</span>
            </label>
            <label className="menu-check">
              <input
                type="checkbox"
                checked={colors.green}
                onChange={() => dispatch(toggleColor('green'))}
              />
              <span>green</span>
            </label>
            <label className="menu-check">
              <input
                type="checkbox"
                checked={colors.blue}
                onChange={() => dispatch(toggleColor('blue'))}
              />
              <span>blue</span>
            </label>
            <label className="menu-check">
              <input
                type="checkbox"
                checked={colors.yellow}
                onChange={() => dispatch(toggleColor('yellow'))}
              />
              <span>yellow</span>
            </label>
          </div>
          <div className="menu-section">
            <label className="menu-label" htmlFor="columns">Columns</label>
            <input
              id="columns"
              type="number"
              min={1}
              max={8}
              value={columns}
              onChange={(event) => {
                const value = Number(event.target.value)
                dispatch(setColumns(Number.isNaN(value) ? 1 : value))
              }}
            />
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
