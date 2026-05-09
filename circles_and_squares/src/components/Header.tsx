import { useState } from 'react'
import BurgerButton from './BurgerButton'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [circlesChecked, setCirclesChecked] = useState(true)
  const [squaresChecked, setSquaresChecked] = useState(true)

  return (
    <header className="header">
      <div className="header-left">
        <BurgerButton
          isOpen={menuOpen}
          onToggle={() => setMenuOpen((value) => !value)}
        />
        <h1 className="header-title">Circles and squares, v.1.0</h1>
      </div>
      <div className="header-filters">
        <label className="header-check">
          <input
            type="checkbox"
            checked={circlesChecked}
            onChange={() => setCirclesChecked((value) => !value)}
          />
          <span>Circles</span>
        </label>
        <label className="header-check">
          <input
            type="checkbox"
            checked={squaresChecked}
            onChange={() => setSquaresChecked((value) => !value)}
          />
          <span>Squares</span>
        </label>
      </div>
      {menuOpen ? (
        <div className="header-menu">
          <p className="header-menu-title">Menu</p>
          <p className="header-menu-note">Filtering is not yet connected</p>
        </div>
      ) : null}
    </header>
  )
}

export default Header
