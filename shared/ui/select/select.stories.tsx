import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Select, { SelectType } from '.'
import { DropdownValueType } from '../dropdown/types'

const meta = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ width: '256px', height: '200px', margin: '60px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type StoryType = StoryObj<typeof Select>

const options = [
  {
    value: '1-',
    label: '1년이하',
  },
  {
    value: '1+',
    label: '1년~2년',
  },
  {
    value: '2+',
    label: '2년~3년',
  },
  {
    value: '3+',
    label: '3년이상',
  },
]

const ControlledSelect = (args: SelectType) => {
  let initialValue = null
  const { isMultiple } = args
  if (isMultiple) initialValue = []
  const [value, setValue] = useState<DropdownValueType>(initialValue)
  return <Select {...args} value={value} onChange={(newValue) => setValue(newValue)} />
}

export const Default: StoryType = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    size: 'small',
    placeholder: '수익률',
    isMultiple: false,
    hasCheck: false,
    options,
  },
}

export const Large: StoryType = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    ...Default.args,
    size: 'large',
  },
}

export const Multiple: StoryType = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    ...Default.args,
    isMultiple: true,
  },
}

export const WithCheck: StoryType = {
  render: (args) => <ControlledSelect {...args} />,
  args: {
    ...Default.args,
    hasCheck: true,
  },
}
