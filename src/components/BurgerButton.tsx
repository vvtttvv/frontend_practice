type BurgerButtonProps = {
  isOpen: boolean
  onToggle: () => void
}

function BurgerButton({ isOpen, onToggle }: BurgerButtonProps) {
  return (
    <button
      type="button"
      className={`burger ${isOpen ? 'is-open' : ''}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span />
      <span />
      <span />
    </button>
  )
}

export default BurgerButton
