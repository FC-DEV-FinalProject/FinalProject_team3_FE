import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from './index'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type StoryType = StoryObj<typeof Checkbox>

const CheckboxWithHook = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState(false)
  return <Checkbox isChecked={isChecked} onChange={setIsChecked} {...props} />
}

export const Gray500: StoryType = {
  render: () => <CheckboxWithHook label="로그인 유지" textColor="gray500" />,
}

export const Gray600: StoryType = {
  render: () => <CheckboxWithHook label="로그인 유지" textColor="gray600" />,
}

export const Gray800: StoryType = {
  render: () => <CheckboxWithHook label="동의합니다" textColor="gray800" />,
}
