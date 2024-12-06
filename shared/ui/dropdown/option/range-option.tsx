import { useState } from 'react'

// import { DropdownContext } from '..'
import styles from '../styles.module.scss'

const RangeOption = ({ onRangeChange }: { onRangeChange: (min: string, max: string) => void }) => {
  const [range, setRange] = useState({ min: '', max: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRange((prev) => ({ ...prev, [name]: value }))
    onRangeChange(range.min, range.max)
  }

  return (
    <div className={styles.inputRange}>
      <input
        type="text"
        placeholder="최소"
        name="min"
        value={range.min}
        onChange={handleInputChange}
      />
      ~
      <input
        type="text"
        placeholder="최대"
        name="max"
        value={range.max}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default RangeOption
