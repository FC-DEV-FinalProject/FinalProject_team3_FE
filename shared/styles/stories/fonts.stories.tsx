import type { Meta, StoryObj as Story } from '@storybook/react'

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

const TYPOGRAPHY_EXAMPLE = '인베스트메틱 Investmetic 0123' as const

interface FontStyleModel {
  size: string
  weight: number
  label: string
}

interface FontPreviewProps extends FontStyleModel {
  example?: string
}

const FontPreview = ({ size, weight, label, example = TYPOGRAPHY_EXAMPLE }: FontPreviewProps) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '32px' }}>
    <div style={{ width: '160px' }}>
      <div style={{ marginBottom: '4px', fontSize: '14px', color: '#797979' }}>{label}</div>
      <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#a7a7a7' }}>
        {size} / {weight}
      </div>
    </div>
    <div
      style={{
        fontFamily: 'var(--font-pretendard)',
        fontSize: size,
        fontWeight: weight,
      }}
    >
      {example}
    </div>
  </div>
)

interface TypographySectionProps {
  title: string
  fonts: Array<FontStyleModel>
}

const TypographySection = ({ title, fonts }: TypographySectionProps) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>{title}</h2>
    {fonts.map((font) => (
      <FontPreview key={font.label} {...font} />
    ))}
  </div>
)

export const Typography: Story = {
  render: () => (
    <>
      <h1 style={{ margin: '24px 0', fontSize: '32px', fontWeight: 'bold' }}>Typography</h1>

      <TypographySection
        title="Headings"
        fonts={[
          { size: '54px', weight: 700, label: 'H1' },
          { size: '36px', weight: 700, label: 'H2' },
          { size: '30px', weight: 600, label: 'H3' },
          { size: '24px', weight: 600, label: 'H4' },
        ]}
      />
      <TypographySection
        title="Body"
        fonts={[
          { size: '20px', weight: 600, label: 'B1' },
          { size: '16px', weight: 600, label: 'B2' },
          { size: '14px', weight: 600, label: 'B3' },
        ]}
      />
      <TypographySection
        title="Caption"
        fonts={[
          { size: '12px', weight: 500, label: 'C1' },
          { size: '10px', weight: 500, label: 'C2' },
        ]}
      />
      <TypographySection
        title="Weights"
        fonts={[
          { size: '18px', weight: 700, label: 'Bold' },
          { size: '18px', weight: 600, label: 'Semibold' },
          { size: '18px', weight: 500, label: 'Medium' },
        ]}
      />
    </>
  ),
}

export default meta
