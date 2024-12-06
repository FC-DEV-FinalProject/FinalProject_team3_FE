import type { Meta, StoryObj } from '@storybook/react'

import AverageMetricsContainer from './index'

const meta = {
  title: 'Components/AverageMetricsChart',
  component: AverageMetricsContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AverageMetricsContainer>

type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {}

export default meta
